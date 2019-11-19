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
      <div class="trip-request-card" v-if="tripRequest">
        <h3>{{tripRequest.start}} - {{tripRequest.destination}}</h3>
        <h4>{{tripRequest.distance}} - {{tripRequest.price}} - {{tripRequest.duration}}</h4>
        <button @click="acceptRequest" class="btn btn-primary btn-block">Accepter</button>
        <button @click="declineRequest" class="btn btn-default btn-block">Refuser</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { acceptTripRequestAsync, declineTripRequestAsync } from "@/api.js";
// import { EventBus } from "@/event-bus.js";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("initDirectionServices");
  },
  mounted() {
    this.drawRouteAsync(this.$refs.map);
  },
  methods: {
    acceptRequest() {
      acceptTripRequestAsync(this.tripRequest)
      .then(() => {
        this.$router.push("/directions");
      });
      
    },
    declineRequest() {
      declineTripRequestAsync(this.tripRequest)
      .then(() => {
        this.$router.push("/idle");
      });
      
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