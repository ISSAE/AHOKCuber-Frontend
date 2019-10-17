<template>
  <div class="confirm-trip-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <router-link to="/">
          <i class="fa fa-arrow-left"></i>
        </router-link>
        <b style="margin-left: 12px">Confirmez votre voyage</b>
      </div>
    </div>
    <div class="body">
      <gmap-map
        :center="{lat: 0, lng: 0}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
      ></gmap-map>
      <div class="confirm-trip-card">
        <h3>20km - 6000L.L - 10 minutes</h3>
        <button class="btn btn-primary btn-block">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
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