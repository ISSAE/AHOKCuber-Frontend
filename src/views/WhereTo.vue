<template>
  <div class="where-to-screen">
    <div class="body">
      <div class="map-overlay">
        <div class="top">
          <div class="history">
            <i class="fa fa-history"></i>
          </div>
          <div class="profile">
            <i class="fa fa-user"></i>
          </div>
        </div>
        <div class="bottom">
          <i class="fa fa-search search-icon"></i>
          <GmapAutocomplete
            class="where-to-textfield"
            ref="autocomplete"
            placeholder="Où aller ?"
            @click="$router.push('/trip-search')"
          ></GmapAutocomplete>
        </div>
      </div>

      <gmap-map
        :center="mapCenter"
        :zoom="8"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
        ref="map"
      >
        <gmap-marker :position="center = currentPosition" :clickable="false" :draggable="false"></gmap-marker>
        <gmap-circle :center="mapCenter"></gmap-circle>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPosition: { lat: 0, lng: 0 }
    };
  },
  methods: {},
  created() {
    this.getCurrentLocationAsync().then(pos => {
      console.log(pos);
      this.$store.dispatch("setMapCenter", pos);
      this.currentPosition = pos;
    });
  },
  watch: {
    mapCenter() {
      console.log(this.mapCenter);
    }
  },
  computed: {
    ...mapState({
      mapCenter: state => state.mapStore.mapCenter
    })
  }
};
</script>

<style>
.where-to-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.where-to-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.where-to-screen .body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;
}
.map-overlay {
  z-index: 100;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  width: 75%;
}
.map-overlay .top {
  display: flex;
  justify-content: flex-end;
}

.map-overlay .top .profile {
  margin: 4px;
  background: white;
  border: 1px solid grey;
  padding: 15px;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: grey;
}

.map-overlay .top .history {
  margin: 4px;
  background: white;
  border: 1px solid grey;
  padding: 15px;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: grey;
}

.map-overlay .bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-overlay .bottom .where-to-textfield {
  flex-grow: 1;
  padding: 10px;
  font-size: 24px;
  text-align: center;
  border: 1px solid grey;
}

.map-overlay .bottom .search-icon {
  position: absolute;
  left: 12px;
  -webkit-text-stroke: 1px white;
  font-size: 24px;
}
</style>