<template>
  <div class="trip-request-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <a href="javascript:void(0);" @click="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
        </a>
        <b style="margin-left: 12px">Requête client</b>
      </div>
    </div>
    <div class="body">
      <gmap-map
        ref="map"
        :center="mapCenter"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
      ></gmap-map>
      <div class="trip-request-card" v-if="tripRequest && directionsData">
        <h6>De: {{tripRequest.start}}</h6>
        <h6>À: {{tripRequest.destination}}</h6>
        <h4>{{directionsData.distance.text}} - {{tripRequest.price}} - {{directionsData.duration.text}}</h4>
        <button @click="acceptRequest" class="btn btn-primary btn-block">Accepter</button>
        <button @click="declineRequest" class="btn btn-default btn-block">Refuser</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { EventBus } from "@/event-bus.js";
import {socket} from "@/socket.js";
export default {
  data() {
    return {
      directionsData: null
    };
  },
  created() {
  },
  mounted() {
    this.drawRouteAsync(this.$refs.map)
    .then((directionsResult) => {
        const leg = directionsResult.routes[0].legs[0]; // contains the directions data + other stuff
        const directionsData = {};
        directionsData.distance = leg.distance;
        directionsData.duration = leg.duration;
        directionsData.steps = leg.steps;
        this.directionsData = directionsData;
        //this.$store.dispatch("setDirectionsData", directionsData);
    });
  },
  methods: {
    acceptRequest() {
      alert("acceptRequest");
      this.getCurrentLocationAsync()
      .then(pos => { 
        console.log(this.start);  
        this.$store.dispatch("setDestination", {lat: this.start.lat, lng: this.start.lng});
        this.$store.dispatch("setStart", {lat: pos.lat, lng: pos.lng});
        socket.emit('trip_accepted', this.tripRequest.client.id);
        this.$router.push("/directions");
        
      }) 
      
    },
    declineRequest() {
      this.$router.push("/idle");
    }
  },
  watch: {
    tripRequest() {
      if (this.tripRequest) {
        this.drawRouteAsync(this.$refs.map);
      }
    }
  },
  computed: {
    ...mapState({
      start: state => state.mapStore.start,
      destination: state => state.mapStore.destination,
      mapCenter: state => state.mapStore.mapCenter,
      tripRequest: state => state.mapStore.tripRequest
    })
  }
};
</script>

<style lang="scss">
.trip-request-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.trip-request-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
  background: #c4c4c4;
  padding-top: 24px;
}
.trip-request-screen .body {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;

  .trip-request-card {
    background: white;
    padding: 8px;
    width: 100%;
  }
}
</style>