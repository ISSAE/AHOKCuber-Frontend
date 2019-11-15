<template>
  <div class="choose-driver-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <a href="javascript:void(0);" @click="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
        </a>
        <b style="margin-left: 12px">Choisissez votre pilote</b>
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
      <div class="choose-driver-card" v-if="currentCandidateDriver">
        <h3>{{currentCandidateDriver.first_name}} - {{currentCandidateDriver.car_model}}</h3>
        <button @click="confirmCandidateDriver" class="btn btn-primary btn-block">Confirmer</button>
        <button @click="nextCandidateDriver" class="btn btn-default btn-block">Rechercher un autre conducteur</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCandidateDriversAsync, requestCandidateDriverApproval } from "../api.js";
import {parse, stringify} from 'flatted/esm';
export default {
  data() {
    return {
      currentCandidateDriverIndex: 0,
      candidateDrivers: [],
      hasDriverAccepted: null
    };
  },
  created() {
  },
  mounted() {
    this.drawRouteAsync(this.$refs.map, this.start, this.destination)
    .then((directionsResult) => {
      const leg = directionsResult.routes[0].legs[0]; // contains the directions data + other stuff
      const directionsData = {};
      directionsData.distance = leg.distance;
      directionsData.duration = leg.duration;
      directionsData.steps = leg.steps;
      this.directionsData = directionsData;
      
      getCandidateDriversAsync({start: this.start, end: this.destination})
      .then(({body}) => {
        this.candidateDrivers = body.drivers;
      })
    });
     
  },
  methods: {
    confirmCandidateDriver() {
      requestCandidateDriverApproval(this.currentCandidateDriver)
      .then(({body}) => {
        this.hasDriverAccepted = body.driverResponse.accepted;
        this.$store.dispatch("setDriver", body.driverResponse.driver);
        this.$router.push("/driver-coming");
      });
    },
    nextCandidateDriver() {
      const driversCount = this.candidateDrivers.length;
      this.currentCandidateDriverIndex += 1;
      if(driversCount <= this.currentCandidateDriverIndex) {
        this.currentCandidateDriverIndex = 0;
      }
    }
  },
  watch: {
  },
  computed: {
    currentCandidateDriver() {
      return this.candidateDrivers[this.currentCandidateDriverIndex];
    },
    ...mapState({
      mapCenter: state => state.mapStore.mapCenter,
      start: state => state.mapStore.start,
      destination: state => state.mapStore.destination,
    })
  }  
};
</script>

<style lang="scss">
.choose-driver-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.choose-driver-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
  background: #c4c4c4;
  padding-top: 24px;
}
.choose-driver-screen .body {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;

  .choose-driver-card {
    background: white;
    padding: 8px;
    width: 100%;
  }
}
</style>