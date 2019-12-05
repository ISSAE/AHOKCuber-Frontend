<template>
  <div class="driver-coming-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <a href="javascript:void(0);" @click="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
        </a>
        <b style="margin-left: 12px">Votre conducteur est en chemin</b>
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
      <div class="driver-coming-card" v-if="driver">
        <h3>{{driver.first_name}} - {{driver.car_model}}</h3>
      </div>
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
  },
  mounted() {
    this.drawRouteAsync(this.$refs.map, this.start, this.destination);
    socket.on("receive_location", (data) => {
      // let driver = data.driver;
      this.currentDriverLocation = data.location;
    });
     
  },
  methods: {
    setDriverArrived() {
      socket.emit("driver_arrived");
      this.$router.push("/directions");
    },
    setCouldNotMeet() {
      socket.emit("could_not_meet");
      this.$router.push("/where-to");
    }
  },
  watch: {
  },
  computed: {
    ...mapState({
      mapCenter: state => state.mapStore.mapCenter,
      start: state => state.mapStore.start,
      destination: state => state.mapStore.destination,
      driver: state => state.mapStore.driver
    })
  }  
};
</script>

<style lang="scss">
.driver-coming-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.driver-coming-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
  background: #c4c4c4;
  padding-top: 24px;
}
.driver-coming-screen .body {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;

  .driver-coming-card {
    background: white;
    padding: 8px;
    width: 100%;
  }
}
</style>