<template>
  <div class="idle-screen">
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
      </div>

      <gmap-map
        :center="mapCenter"
        :zoom="8"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
        ref="map"
      >
        <gmap-marker :position="currentPosition" :clickable="false" :draggable="false"
        :icon="driverPositionMarkerIcon"></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { socket } from '@/socket.js';
import DriverPositionImg from '@/assets/images/driver_icon.png';
export default {
  data() {
    return {
      currentPosition: { lat: 0, lng: 0 }
    };
  },
  methods: {},
  created() {
    this.$store.dispatch("setMapCenter", this.currentPosition);
  },
  mounted() {
    socket.on('request_location', (user) => {
      this.getCurrentLocationAsync().then(pos => {
        var jsonObject = {user: user, location: JSON.stringify(pos)};
        socket.emit('get_location', jsonObject);
      });
    });
    socket.on('request_trip', (data) => {
      console.log(data);
      let clientLocation = JSON.parse(data.location); // coords form
      let clientDestination = JSON.parse(data.destination); // coords form
      let client = data.client;
      this.getCoordinatesPlace(clientLocation).then(place => {
          var tripStart = place; // human-readable form
          var tripEnd = ""; // human-readable form
          this.getCoordinatesPlace(clientDestination).then(endPlace => {
            tripEnd = endPlace;
            let tripRequest = {start: {text: tripStart, coords: clientLocation}, 
            destination: {text: tripEnd, coords: clientDestination}, client: client}; 
            this.$store.dispatch("setTripRequest", tripRequest);
            this.$store.dispatch("setMapCenter", tripRequest.start.coords);
            this.$store.dispatch("setStart", tripRequest.start.coords);
            this.$store.dispatch("setDestination", tripRequest.destination.coords);
            this.$router.push("/trip-request");
          });
      });
    });

    this.getCurrentLocationAsync().then(pos => {
      this.$store.dispatch("setMapCenter", pos);
      this.currentPosition = pos;
    });    
  },
  watch: {
    mapCenter() {
    }
  },
  computed: {
    driverPositionMarkerIcon() {
      return {
        url: DriverPositionImg,
        size: {width: 20, height: 20}
      };
    },
    ...mapState({
      mapCenter: state => state.mapStore.mapCenter
    })
  }
};
</script>

<style>
.idle-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.idle-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.idle-screen .body {
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
.map-overlay .bottom .idle-textfield {
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