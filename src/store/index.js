import Vuex from 'vuex'
import Vue from 'vue'
import map from './modules/map'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    mapStore: map
  },
  strict: debug
})