<template>
  <div class="trip-search-screen">
    <div class="header">
      <div class="row mr-0">
        <div class="col-2">
          <i class="fa fa-3x fa-chevron-left fa-thin"></i>
        </div>
        <div class="col-8">
          <h1>Où aller ?</h1>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="row mr-0">
        <div class="col-12">
            <GmapAutocomplete
              class="trip-search-textfield"
              ref="autocomplete"
              placeholder="Point de départ"
            ></GmapAutocomplete>
        </div>
        <div class="col-12">
            <GmapAutocomplete
              class="trip-search-textfield"
              ref="autocomplete"
              placeholder="Où aller ?"
            ></GmapAutocomplete>
        </div>        
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

<style>
.trip-search-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.trip-search-screen .header {
  width: 100%;
  padding-top: 10px;
}
.trip-search-screen .body {
  display: flex;
  padding-top: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;
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