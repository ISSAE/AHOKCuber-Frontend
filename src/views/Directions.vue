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
      <gmap-map
      ref="map"
        :center="mapCenter"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
      ></gmap-map>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import socket from "@/socket.js";
export default {
  data() {
    return {
      currentDriverLocation: null
    };
  },
  created() {
    alert("Directions!");
  },
  mounted() {
    this.drawRouteAsync(this.$refs.map, this.start, this.destination);
    setInterval(() => {
      this.getCurrentLocationAsync().then((pos) => {
        console.log(pos);
      });
    }, 1000);

    socket.on('trip_updated', (trip) => {
      console.log('trip_updated:', trip);
      // depends on driver and client
    });
  },
  methods: {
    setArrivedToDestination() {
      socket.emit('arrived_to_dest', this.trip.id);
    },
  },
  watch: {
  },
  computed: {
    ...mapState({
      mapCenter: state => state.mapStore.mapCenter,
      start: state => state.mapStore.start,
      destination: state => state.mapStore.destination,
      driver: state => state.mapStore.driver,
      trip: state => state.mapStore.trip
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