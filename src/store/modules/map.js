
const state = {
    mapCenter: null,
    directionsDisplay: null,
    directionsService: null,
    start: null,
    destination: null,
    directionsData: null,
    driver: null,
    tripRequest: null // trip request as received by the driver
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
    setMapCenter({ commit }, { lat, lng }) {
        commit('SET_MAP_CENTER', { lat, lng })
    },
    /**
     * Sets the start position of the trip in the store
     * @param {*} coords - the map coordinates as {lat, lng}
     */
    setStart({ commit }, coords) { // coords = {lat, lng} object
        commit('SET_START', coords);
    },
    setDestination({ commit }, { lat, lng }) {
        commit('SET_DESTINATION', { lat, lng });
    },
    setDirectionsData({ commit }, directionsData) {
        commit('SET_DIRECTIONS_DATA', directionsData);
    },
    setDriver({ commit }, driver) {
        commit('SET_DRIVER', driver);
    },
    setTripRequest({ commit }, tripRequest) {
        commit('SET_TRIP_REQUEST', tripRequest);
    }
}

// mutations
const mutations = {

    'INIT_DIRECTION_SERVICES'(state) {
        state.directionsDisplay = new window.google.maps.DirectionsRenderer();
        state.directionsService = new window.google.maps.DirectionsService();

    },
    'SET_START'(state, coords) { // {lat, lng}
        state.start = coords;
    },
    'SET_DESTINATION'(state, { lat, lng }) {
        state.destination = { lat, lng };
    },
    'SET_MAP_CENTER'(state, { lat, lng }) {
        state.mapCenter = { lat, lng };
    },
    'SET_DIRECTIONS_DATA'(state, directionsData) {
        state.directionsData = directionsData;
    },
    'SET_DRIVER'(state, driver) {
        state.driver = driver;
    },
    'SET_TRIP_REQUEST'(state, tripRequest) {
        state.tripRequest = tripRequest;
    }
}

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
}