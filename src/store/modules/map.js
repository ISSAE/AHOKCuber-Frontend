import { gmapApi } from "vue2-google-maps";

const state = {
    mapCenter: null,
    directionsDisplay: null,
    directionsService: null,
    start: null,
    destination: null,
    google: gmapApi,
}

const getters = {
    // isAuthenticated: state => {
    //     return state.user != null     
    // }
};

// actions
const actions = {
    initDirectionServices({ commit }) {
        commit('INIT_DIRECTION_SERVICES')
    },
    setMapCenter({ state, commit }, { lat, lng }) {
        commit('SET_MAP_CENTER', { lat, lng })
    },
    setStart({ state, commit }, { lat, lng }) {
        commit('SET_START', { lat, lng });
    },
    setDestination({ state, commit }, { lat, lng }) {
        commit('SET_DESTINATION', { lat, lng });
    },
}

// mutations
const mutations = {

    'INIT_DIRECTION_SERVICES'(state) {
        state.directionsDisplay = new state.google.maps.DirectionsRenderer();
        state.directionsService = new state.google.maps.DirectionsService();
    },
    'SET_START'(state, { lat, lng }) {
        state.start = { lat, lng };
    },
    'SET_DESTINATION'(state, { lat, lng }) {
        state.end = { lat, lng };
    },
    'SET_MAP_CENTER'(state, { lat, lng }) {
        state.mapCenter = { lat, lng };
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}