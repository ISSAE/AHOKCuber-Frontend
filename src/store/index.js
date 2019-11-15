import Vuex from 'vuex'
import Vue from 'vue'
import map from './modules/map'
import VuexPersistence from 'vuex-persist'
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true
})
export default new Vuex.Store({
  modules: {
    mapStore: map
  },
  strict: debug,
  plugins: [vuexLocal.plugin]
})