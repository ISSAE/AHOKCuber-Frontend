import { mapState } from "vuex";
import waitForGlobal from '@/global-wait';
export default {
    data() {
        return {
            directionsDisplay: null,
            directionsService: null
        };
    },
    created() {
        waitForGlobal("google", () => {
            this.directionsDisplay = new window.google.maps.DirectionsRenderer();
            this.directionsService = new window.google.maps.DirectionsService();
        })
    },
    methods: {
        /**
         * Resolves with a DirectionsResult object
         * @param {object} mapRef - ref to map component
         */
        drawRouteAsync(mapRef, directionsPanelRef) {
            return new Promise((resolve, reject) => {
                var directionsDisplaySet = Object.keys(this.directionsDisplay).length === 0;
                var directionsServiceSet = Object.keys(this.directionsService).length === 0;
                if (!directionsDisplaySet || !directionsServiceSet || !this.start || !this.destination) {
                    reject({
                        directionsService: this.directionsService,
                        directionsDisplay: this.directionsDisplay,
                        start: this.start,
                        destination: this.destination
                    });
                } else {
                    this.$nextTick(() => {
                        mapRef.$mapPromise.then(() => {
                            this.directionsDisplay.setMap(mapRef.$mapObject);
                            // this.trafficLayer.setMap(mapRef.$mapObject);
                            this.directionsService.route(
                                {
                                    origin: this.start,
                                    destination: this.destination,
                                    travelMode: "DRIVING",
                                    drivingOptions: {
                                        departureTime: new Date(Date.now()),
                                        trafficModel: 'optimistic'
                                    }
                                },
                                (response, status) => {
                                    if (status === "OK") {
                                        this.directionsDisplay.setDirections(response);
                                        if(directionsPanelRef) {
                                            this.directionsDisplay.setPanel(directionsPanelRef);
                                        }
                                        resolve(response);
                                    } else {
                                        reject(status);
                                    }
                                }
                            );
                        });
                    });
                }
            });
        },
        /**
         * @returns {object} position - {lat, lng}
         */
        getCurrentLocationAsync() {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject();
                }
                navigator.geolocation.getCurrentPosition(position => {
                    let pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    resolve(pos);
                });
            });

        },
        /**
         * 
         * @param {object} place - the place object from gmap-autocomplete 
         */
        getPlaceCoordinates(place) {
            return { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
        },
        getCoordinatesPlace(coords) {
            var geocoder = new window.google.maps.Geocoder;
            return new Promise((resolve, reject) => {
                geocoder.geocode({"location": coords}, (results, status) => {
                    if(status !== "OK") {
                        reject();
                    } else {
                        resolve(results[0].formatted_address);
                    }
                });
            });
        },
        getDistanceInKm(point1, point2) {
            var p = 0.017453292519943295;    // Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((point2.lat - point1.lat) * p)/2 + 
                    c(point1.lat * p) * c(point2.lat * p) * 
                    (1 - c((point2.lng - point1.lng) * p))/2;
          
            return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
          }
    },
    computed: {
        autocompleteOptions() {
            var southWest = new window.google.maps.LatLng(34.524510, 36.239550);
            var northEast = new window.google.maps.LatLng(33.270020, 35.194328);
            var lebanonBounds = new window.google.maps.LatLngBounds(southWest, northEast);

            var options = {
                bounds: lebanonBounds,
                componentRestrictions: { country: 'lb' }
            };
            return options;
        },
        ...mapState({
            mapCenter: state => state.mapStore.mapCenter,
            start: state => state.mapStore.start,
            destination: state => state.mapStore.destination,
        }),
    }
};