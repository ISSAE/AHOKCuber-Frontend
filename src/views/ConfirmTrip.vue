<template>
  <div class="confirm-trip-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <a href="javascript:void(0);" @click="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
        </a>
        <b style="margin-left: 12px">Confirmez votre voyage</b>
      </div>
    </div>
    <div class="body">
      <gmap-map
      ref="map"
        :center="{lat: 0, lng: 0}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
      ></gmap-map>
      <div class="confirm-trip-card" v-if="directionsData">
        <h3>{{directionsData.distance.text}} - 6000L.L - {{directionsData.duration.text}}</h3>
        <button @click="$router.push('/choose-driver')"
        class="btn btn-primary btn-block">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      directionsData: null
    };
  },
  created() {
  },
  mounted() {
    this.$store.dispatch("setDirectionsData", null);
    this.drawRouteAsync(this.$refs.map, this.start, this.destination)
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
  methods: {},
  watch: {
    directionsData() {
    }
  },
  computed: {
    ...mapState({
      mapCenter: state => state.mapStore.mapCenter,
      start: state => state.mapStore.start,
      destination: state => state.mapStore.destination,
  //    directionsData: state => state.mapStore.directionsData
    })
  }  
};
</script>

<style lang="scss">
.confirm-trip-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.confirm-trip-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
  background: #c4c4c4;
  padding-top: 24px;
}
.confirm-trip-screen .body {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;

  .confirm-trip-card {
    background: white;
    padding: 8px;
    width: 100%;
  }
}

.trip-search-screen .body .trip-search-textfield {
  margin-bottom: 20px;
  font-size: 18px;
  border: 1px solid grey;
  border-radius: 5px;
  width: 80%;
  text-align: center;
}
</style>