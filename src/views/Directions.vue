<template>
  <div class="directions-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <a href="javascript:void(0);" @click="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
        </a>
        <b style="margin-left: 12px">Navigation</b>
      </div>
    </div>
    <div class="body">
      <div v-if="activeSteps.length>0">
        <div v-for="activeStep in activeSteps" :key="activeStep.instructions">
          <p v-html="activeStep.instructions"></p>
        </div>
      </div>
      <div ref="directionsPanel" style="height: 220px; overflow-y: auto;"></div>
      <gmap-map
        ref="map"
        :center="mapCenter"
        :zoom="zoomLevel"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
      >
        <gmap-marker
          :position="currentLocationCoords"
          :clickable="false"
          :draggable="false"
          :icon="driverPositionMarkerIcon"
        ></gmap-marker>
      </gmap-map>
      <div v-if="currentLocation" style="position: fixed; bottom: 0px; background-color: white;">
        {{currentLocation.coords.accuracy}}
      </div>
      <div class="directions-card" v-if="hasArrived">
        <h3>Vous êtes arrivé</h3>
        <button @click="confirmArrived" class="btn btn-primary btn-block">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { socket } from "@/socket.js";
import DriverPositionImg from "@/assets/images/driver_icon.png";
export default {
  data() {
    return {
      activeSteps: [],
      trip: null,
      zoomLevel: 10,
      hasArrived: false,
      directionsResult: null,
      currentLocationCoords: {lat: 0, lng: 0}
    };
  },
  created() {},
  mounted() {
    /**
     * In the directions screen, for the the driver:
     * 1. Show directions from the driver position to the client start point
     * 1. Listen to trip_updated and wait for the trip status to become CLIENT_PICKED_UP
     * 2. When the event happens, change the directions destination to the client's destination
     * 3. In case the status becomes COULD_NOT_MEET because the client marked it as so, an alert
     * is displayed and we return to the home screen
     * 3. Follow the directions
     * 4. Listen to trip_updated and wait for trip status to become FINISHED,
     * in which case we go the trip-ended screen
     *
     * In the directions screen, for the client:
     * 1. This screen only shows after the driver has arrived
     * 2. Show directions and the driver position as he's driving the client
     * 3. When the GPS detects that we're less than 300 meters from the destination,
     * a button pops up asking the client to confirm arrival
     * 4. When the client confirms arrival, we send the arrived_to_dest event
     * 5. After this, we go the trip-ended screen
     */

    this.watchCurrentLocationAsync();
    this.drawRouteAsync(this.$refs.map, this.$refs.directionsPanel).then(
      directionsResult => {
        this.directionsResult = directionsResult;
      }
    );
    if (localStorage.getItem("user_type") == "driver") {
      this.listenToTripUpdates();
    }
  },
  methods: {
    listenToTripUpdates() {
      socket.on("trip_updated", trip => {
        this.trip = trip;
        if (trip.status == "CLIENT_PICKED_UP") {
          this.onClientPickedUp();
        } else if (trip.status == "COULD_NOT_MEET") {
          this.onCouldNotMeet();
        } else if (trip.status == "FINISHED") {
          this.onFinished();
        }
      });
    },
    /**
     * Driver-specific function
     */
    onClientPickedUp() {
      this.$store.dispatch(
        "setDestination",
        this.tripRequest.destination.coords
      );
      this.drawRouteAsync(this.$refs.map, this.$refs.directionsPanel).then(
        directionsResult => {
          this.directionsResult = directionsResult;
        }
      );
    },
    /**
     * Driver-specific function
     */
    onCouldNotMeet() {
      alert("La rencontre a échouée. Retour à la page d'accueil.");
      this.$store.dispatch("setTripRequest", null);
      this.$store.dispatch("setStart", null);
      this.$store.dispatch("setDestination", null);
      this.$router.push("/idle");
    },
    /**
     * Driver-specific function
     */
    onFinished() {
      this.$router.push("/trip-ended");
    },
    showDirections(directionsResult) {
      this.zoomLevel = 19;
      const leg = directionsResult.routes[0].legs[0]; // contains the directions data + other stuff
      const steps = leg.steps;
      var stepIndex = 0;
      for (let step of steps) {
        console.log(step);
        var distanceToStep = this.getDistanceInKm(this.currentLocationCoords, {
          lat: step.start_location.lat(),
          lng: step.start_location.lng()
        });
        if (distanceToStep < 0.2) {
          if (
            !this.activeSteps.find(s => s.instructions == step.instructions)
          ) {
            this.activeSteps.push(step);
          }
          if (
            stepIndex == steps.length - 1 &&
            localStorage.getItem("user_type") == "client"
          ) {
            this.hasArrived = true;
          }
        } else {
          if (this.activeSteps.find(s => s.instructions == step.instructions)) {
            this.activeSteps = [];
          }
        }
        stepIndex++;
      }
    },
    confirmArrived() {
      socket.emit("arrived_to_dest", this.storeTrip.id);
      this.$router.push("/trip-ended");
    }
  },
  watch: {
    currentLocation() {
      if(this.currentLocation == null) {
        return;
      }
      this.currentLocationCoords = { lat: this.currentLocation.coords.latitude, lng: this.currentLocation.coords.longitude}
      this.$store.dispatch("setMapCenter", this.currentLocationCoords);
      if(this.directionsResult) {
        this.showDirections(this.directionsResult);
      }
    }
  },
  computed: {
    driverPositionMarkerIcon() {
      return {
        url: DriverPositionImg,
        size: { width: 20, height: 20 }
      };
    },
    ...mapState({
      mapCenter: state => state.mapStore.mapCenter,
      start: state => state.mapStore.start,
      destination: state => state.mapStore.destination,
      driver: state => state.mapStore.driver,
      tripRequest: state => state.mapStore.tripRequest,
      storeTrip: state => state.mapStore.trip
    })
  }
};
</script>

<style lang="scss">
.directions-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.directions-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
  background: #c4c4c4;
  padding-top: 24px;
}
.directions-screen .body {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;

  .directions-card {
    background: white;
    padding: 8px;
    width: 100%;
  }
}
</style>