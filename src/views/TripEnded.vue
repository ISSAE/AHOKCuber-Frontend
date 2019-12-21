<template>
  <div class="trip-ended-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <a href="javascript:void(0);" @click="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
        </a>
        <b style="margin-left: 12px">Arrivé !</b>
      </div>
    </div>
    <div class="body">
      <gmap-map
        ref="map"
        :center="mapCenter"
        :zoom="18"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
      >
        <gmap-marker
          :position="destination"
          :clickable="false"
          :draggable="false"
        ></gmap-marker>
      </gmap-map>
      <div class="trip-ended-card" v-if="userType == 'client'">
        <h3>Vous êtes arrivé</h3>
        <h4>Notez {{driver.first_name}}</h4>
        <textarea v-model="reviewText"></textarea>
        <input type="number" min="0" max="5" v-model="reviewStars" />
        <button @click="$router.push('/where-to')">Retour à la page d'accueil</button>
      </div>
      <div class="trip-ended-card" v-else>
        <h3>Vous êtes arrivés</h3>
        <h2 style="color: green">Merci !</h2>
        <button class="btn btn-fluid btn-block btn-primary" @click="$router.push('/idle')">Page d'accueil</button>
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
        reviewText: "",
        reviewStars: 0
    };
  },
  created() {},
  mounted() {
  },
  methods: {
  },
  watch: {},
  computed: {
    userType() {
      return localStorage.getItem("user_type");
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
.trip-ended-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.trip-ended-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
  background: #c4c4c4;
  padding-top: 24px;
}
.trip-ended-screen .body {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;

  .trip-ended-card {
    background: white;
    padding: 8px;
    width: 100%;
  }
}
</style>