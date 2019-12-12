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
      >
        <gmap-marker :position="currentDriverLocation" :clickable="false" :draggable="false"
        :icon="driverPositionMarkerIcon"></gmap-marker>
      </gmap-map>
      <div class="driver-coming-card" v-if="driver && arrivalTimeoutSeconds > 0">
        <h3>{{driver.first_name}} - {{driver.car_model}}</h3>
        <h4>{{distanceFromDriver}}</h4>
        <div class="row">
          <div class="col-4">
            <button class="btn btn-block btn-primary" @click="setDriverArrived">OK!</button>
          </div>
          <div class="col-4">
            <button class="btn btn-block btn-secondary"><i class="fa fa-phone"></i> Appeler</button>
          </div> 
          <div class="col-4"><button class="btn btn-block btn-default">{{arrivalTimeoutSeconds}} sec.</button></div>        
        </div>
      </div>
      <div class="driver-coming-card"  v-else>
        <h4>La rencontre a échoué</h4>
        <button class="btn btn-block btn-primary" @click="$router.push('/where-to')">Retourner</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {socket} from "@/socket.js";
import CurrentPositionImg from "@/assets/images/current_position.png";
import DriverPositionImg from '@/assets/images/driver_icon.png';
export default {
  data() {
    return {
      currentDriverLocation: {lat: 0, lng: 0},
      distanceFromDriver: null,
      arrivalTimeoutSeconds: 10
    };
  },
  created() {
    setInterval(() => {
      var driverDistanceKm = parseInt(this.getDistanceInKm(this.currentDriverLocation, this.start));
      if(driverDistanceKm <= 1) {
        this.arrivalTimeoutSeconds--;
      }
      
    }, 1000);
  },
  mounted() {
    this.drawRouteAsync(this.$refs.map);
    socket.on("receive_location", (data) => {
      console.log(data);
      this.$store.dispatch("setDriver", data.driver);
      this.currentDriverLocation = JSON.parse(data.location);
      var driverDistanceKm = parseInt(this.getDistanceInKm(this.currentDriverLocation, this.start));
      if(driverDistanceKm <= 1) {
        this.distanceFromDriver = "Votre conducteur est arrivé";
      } else {
        this.distanceFromDriver = "Votre conducteur est à " + driverDistanceKm + " kilomètres";
      }
      
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
    driverPositionMarkerIcon() {
      return {
        url: DriverPositionImg,
        size: {width: 20, height: 20}
      };
    },    
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