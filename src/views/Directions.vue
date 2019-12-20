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
          :position="currentDriverLocation"
          :clickable="false"
          :draggable="false"
          :icon="driverPositionMarkerIcon"
        ></gmap-marker>
      </gmap-map>
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
      currentDriverLocation: null,
      activeSteps: [],
      trip: null,
      zoomLevel: 10
    };
  },
  created() {},
  mounted() {
    this.drawRouteAsync(this.$refs.map, this.$refs.directionsPanel).then(
      directionsResult => {
        this.pollDirections(directionsResult);
      }
    );

    socket.on("trip_updated", trip => {
      console.log("trip_updated:", trip);
      this.trip = trip;
      if (trip.status == "CLIENT_PICKED_UP") {
        console.log(this.tripRequest);
        this.geocode(this.tripRequest.destination).then(destinationCoords => {
          this.$store.dispatch("setDestination", {
            lat: destinationCoords.lat(),
            lng: destinationCoords.lng()
          });
          this.drawRouteAsync(this.$refs.map, this.$refs.directionsPanel).then(
            directionsResult => {
              this.pollDirections(directionsResult);
            }
          );
        });
      }
    });
  },
  methods: {
    setArrivedToDestination() {
      socket.emit("arrived_to_dest", this.trip.id);
    },
    pollDirections(directionsResult) {
      setInterval(() => {
        this.getCurrentLocationAsync().then(pos => {
          console.log("driver location");
          this.currentDriverLocation = {
            lat: parseFloat(pos.lat.toFixed(5)),
            lng: parseFloat(pos.lng.toFixed(5))
          };
          this.$store.dispatch("setMapCenter", this.currentDriverLocation);
          this.showDirections(directionsResult);
        });
      }, 400);
    },
    showDirections(directionsResult) {
      this.zoomLevel = 19;
      const leg = directionsResult.routes[0].legs[0]; // contains the directions data + other stuff
      const steps = leg.steps;
      this.activeSteps = [];
      for (let step of steps) {
        console.log(this.currentDriverLocation);

        var distanceToStep = this.getDistanceInKm(this.currentDriverLocation, {
          lat: step.start_location.lat(),
          lng: step.start_location.lng()
        });
        if (distanceToStep < 0.2) {
          this.activeSteps.push(step);
        }
      }
    }
  },
  watch: {},
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
      tripRequest: state => state.mapStore.tripRequest
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