/* eslint-disable */
import Vue from 'vue';
import { API_URL } from '@/config.js';
/**
 * Sends a driver registration request 
 * @param {object} payload - The driver data
 * @param {string} payload.email
 * @param {string} payload.first_name
 * @param {string} payload.last_name
 * @param {string} payload.phone_number
 * @param {string} payload.password
 * @param {string} payload.gender - Either "MALE" or "FEMALE"
 * @param {string} payload.car_model - driver car model
 * @param {string} payload.car_registration_number - driver car registration number
 */
export function registerDriverAsync(payload) {
    return Vue.http.post(API_URL + "auth/driver/register", payload)
}

/**
 * Sends a client registration request 
 * @param {object} payload - The driver data
 * @param {string} payload.email
 * @param {string} payload.first_name
 * @param {string} payload.last_name
 * @param {string} payload.phone_number
 * @param {string} payload.password
 * @param {string} payload.gender - Either "MALE" or "FEMALE"
 */
export function registerClientAsync(payload) {
    return Vue.http.post(API_URL + "auth/client/register", payload)
}

/**
 * Sends a client authentication request 
 * @param {object} payload - The client data
 * @param {string} payload.email
 * @param {string} payload.password
 */
export function loginClientAsync(payload) {
    return Vue.http.post(API_URL + "auth/token", payload)
}
/**
 * Sends a driver authentication request 
 * @param {object} payload - The driver data
 * @param {string} payload.email
 * @param {string} payload.password
 */
export function loginDriverAsync(payload) {
    return Vue.http.post(API_URL + "auth/driver/token", payload)
}

/**
 * Get authenticated client
 */
export function getAuthenticatedClientAsync() {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
    return new Promise((resolve, reject) => {
        resolve({
            body: {
                status: "success", client: {
                    gender: "male",
                    first_name: "Adnan",
                    last_name: "Hamzeh",
                    email: "adnan_hamzeh",
                    password: "password",
                    phone_number: "01390390019",
                }
            }
        });
    });
    // TODO get authenticated user endpoint
}

/**
 * Get authenticated client
 */
export function getAuthenticatedDriverAsync() {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
    return new Promise((resolve, reject) => {
        resolve({
            body: {
                status: "success", driver: {
                    gender: "male",
                    first_name: "Adnan",
                    last_name: "Hamzeh",
                    email: "adnan_hamzeh",
                    password: "password",
                    phone_number: "01390390019",
                    car_model: "Renault Clio 2010",
                    car_registration_number: "T 1029303"
                }
            }
        });
    });
    // TODO get authenticated user endpoint
}

/**
 * 
 * @param {object} payload - client data
 * @param {integer} payload.id - ID of the client
 * @param {string} payload.email - email
 * @param {string} payload.password - client password
 * @param {string} payload.first_name - client first name
 * @param {string} payload.last_name - client last name
 * @param {string} payload.gender - client gender, value should be either 'male' or 'female'
 * @param {string} payload.phone_number - client phone number 
 */
export function updateClientProfileAsync(payload) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
    return Vue.http.put(API_URL + "clients/update", {client: payload});
}

/**
 * 
 * @param {object} payload - driver data
 * @param {integer} payload.id - ID of the driver
 * @param {string} payload.email - email
 * @param {string} payload.password - driver password
 * @param {string} payload.first_name - driver first name
 * @param {string} payload.last_name - driver last name
 * @param {string} payload.gender - driver gender, value should be either 'male' or 'female'
 * @param {string} payload.phone_number - driver phone number
 * @param {string} payload.car_model - driver car model
 * @param {string} payload.car_registration_number - driver car registration number 
 */
export function updateDriverProfileAsync(payload) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
    return Vue.http.put(API_URL + "drivers/update", {driver: payload})
}
// /**
//  * Requests a list of candidate drivers for a start and end geolocation points
//  * @param {object} payload - trip data
//  * @param {object} payload.start - the start location object
//  * @param {double} payload.start.lng - the start location longtitude
//  * @param {double} payload.start.lat - the start location latitude
//  * @param {object} payload.end - the end location object
//  * @param {double} payload.end.lng - the end location longtitude
//  * @param {double} payload.end.lat - the end location latitude 
//  */
// export function getCandidateDriversAsync(payload) {
//     Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
//     const driversExampleResponse = { drivers: [] };
//     driversExampleResponse.drivers.push({
//         id: 1,
//         gender: "male",
//         first_name: "Adnan",
//         last_name: "Hamzeh",
//         phone_number: "10103904",
//         car_model: "Renault Clio 2010",
//         rating: 5, // 0 to 5
//     });
//     driversExampleResponse.drivers.push({
//         id: 1,
//         gender: "female",
//         first_name: "Samira",
//         last_name: "Abou Samra",
//         phone_number: "02255420",
//         car_model: "BMW E39 2002",
//         rating: 4
//     });
//     return new Promise((resolve, reject) => {
//         resolve({
//             body: {
//                 status: "success",
//                 drivers: driversExampleResponse.drivers
//             }
//         });
//     });
// }

// /**
//  * Requests approval from the client to the driver
//  * This request is long-polled and waits for the driver's confirmation
//  * @param {object} driver - the driver object
//  * @param {integer} driver.id - the driver's ID 
//  */
// export function requestCandidateDriverApproval(driver) {
//     Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
//     return new Promise((resolve, reject) => {
//         resolve({
//             body: {
//                 status: "success",
//                 driverResponse: { accepted: true, driver: driver }
//             }
//         });
//     });
// }

// /**
//  * Sends a driver's approval of a trip request
//  * @param {object} tripRequest - the trip request object
//  * @param {object} tripRequest.start - start coords of the trip request
//  * @param {double} tripRequest.start.lat - start latitude
//  * @param {double} tripRequest.start.lng - start longtitude
//  * @param {object} tripRequest.destination - same as start, but for the destination
//  * @param {object} tripRequest.client - the client requesting the trip
//  * @param {string} tripRequest.client.first_name - the first name of the client
//  * @param {string} tripRequest.client.last_name - the last name of the client  
//  */
// export function acceptTripRequestAsync(tripRequest) {
//     Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
//     return new Promise((resolve, reject) => {
//         resolve({ body: { status: "success" } });
//     });
// }

// /**
//  * Sends a driver's disapproval of a trip request
//  * @param {object} tripRequest - the trip request object
//  * @param {object} tripRequest.start - start coords of the trip request
//  * @param {double} tripRequest.start.lat - start latitude
//  * @param {double} tripRequest.start.lng - start longtitude
//  * @param {object} tripRequest.destination - same as start, but for the destination
//  * @param {object} tripRequest.client - the client requesting the trip
//  * @param {string} tripRequest.client.first_name - the first name of the client
//  * @param {string} tripRequest.client.last_name - the last name of the client  
//  */
// export function declineTripRequestAsync(driver) {
//     Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
//     return new Promise((resolve, reject) => {
//         resolve({
//             body: {
//                 status: "success"
//             }
//         });
//     });
// }

/**
 * Updates a trip
 * @param {object} trip - The trip object to update 
 * @param {integer} trip.id - The ID of the trip to update
 * @param {distance} [trip.distance] - In kilometers
 * @param {date} [started_at] - UTC time when the trip started
 * @param {date} [ended_at] - UTC time when the trip ended
 * @param {object} [start_location] - start location coords lat,lng
 * @param {object} [end_location] - end location coords lat,lng
 * @param {string} [start_location_search_term] - start location search term
 * @param {string} [end_location_search_term] - end location saerch term
 * @param {string} [status] - the trip status, one of: client_waiting, client_picked_up, could_not_meet, finished
 */
export function updateTripAsync(trip) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
    return Vue.http.put(API_URL + "trips/update", {trip: trip});  
}

/**
 * Gets a trip
 * @param {integer} id - The ID of the trip to get 
 */
export function getTripAsync(id) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
    return Vue.http.get(API_URL + "trips/get/"+id); 
}


