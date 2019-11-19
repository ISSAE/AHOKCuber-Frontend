/* eslint-disable */

/**
 * Sends a driver registration request 
 * @param {object} payload - The driver data
 * @param {string} payload.username
 * @param {string} payload.first_name
 * @param {string} payload.last_name
 * @param {string} payload.phone_number
 * @param {string} payload.password
 * @param {string} payload.gender - Either "male" or "female"
 * @param {string} payload.car_model - driver car model
 * @param {string} payload.car_registration_number - driver car registration number
 */
export function registerDriverAsync(payload) {
    return new Promise((resolve, reject) => {
        resolve({ body: { status: "success" } });
    });
    // TODO registration endpoint
}

/**
 * Sends a client registration request 
 * @param {object} payload - The driver data
 * @param {string} payload.username
 * @param {string} payload.first_name
 * @param {string} payload.last_name
 * @param {string} payload.phone_number
 * @param {string} payload.password
 * @param {string} payload.gender - Either "male" or "female"
 */
export function registerClientAsync(payload) {
    return new Promise((resolve, reject) => {
        resolve({ body: { status: "success" } });
    });
    // TODO registration endpoint
}

/**
 * Sends a user authentication request 
 * @param {object} payload - The user data
 * @param {string} payload.email
 * @param {string} payload.password
 */
export function loginAsync(payload) {
    // TODO login endpoint
}

/**
 * Get authenticated client
 */
export function getAuthenticatedClientAsync() {
    return new Promise((resolve, reject) => {
        resolve({
            body: {
                status: "success", client: {
                    gender: "male",
                    first_name: "Adnan",
                    last_name: "Hamzeh",
                    username: "adnan_hamzeh",
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
    return new Promise((resolve, reject) => {
        resolve({
            body: {
                status: "success", driver: {
                    gender: "male",
                    first_name: "Adnan",
                    last_name: "Hamzeh",
                    username: "adnan_hamzeh",
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
 * @param {string} payload.username - username
 * @param {string} payload.password - client password
 * @param {string} payload.first_name - client first name
 * @param {string} payload.last_name - client last name
 * @param {string} payload.gender - client gender, value should be either 'male' or 'female'
 * @param {string} payload.phone_number - client phone number 
 */
export function updateClientProfileAsync(payload) {
    return new Promise((resolve, reject) => {
        resolve({ body: { status: "success" } });
    });
}

/**
 * 
 * @param {object} payload - driver data
 * @param {string} payload.username - username
 * @param {string} payload.password - driver password
 * @param {string} payload.first_name - driver first name
 * @param {string} payload.last_name - driver last name
 * @param {string} payload.gender - driver gender, value should be either 'male' or 'female'
 * @param {string} payload.phone_number - driver phone number
 * @param {string} payload.car_model - driver car model
 * @param {string} payload.car_registration_number - driver car registration number 
 */
export function updateDriverProfileAsync(payload) {
    return new Promise((resolve, reject) => {
        resolve({ body: { status: "success" } });
    });
}
/**
 * Requests a list of candidate drivers for a start and end geolocation points
 * @param {object} payload - trip data
 * @param {object} payload.start - the start location object
 * @param {double} payload.start.lng - the start location longtitude
 * @param {double} payload.start.lat - the start location latitude
 * @param {object} payload.end - the end location object
 * @param {double} payload.end.lng - the end location longtitude
 * @param {double} payload.end.lat - the end location latitude 
 */
export function getCandidateDriversAsync(payload) {
    const driversExampleResponse = { drivers: [] };
    driversExampleResponse.drivers.push({
        id: 1,
        gender: "male",
        first_name: "Adnan",
        last_name: "Hamzeh",
        phone_number: "10103904",
        car_model: "Renault Clio 2010",
        rating: 5, // 0 to 5
    });
    driversExampleResponse.drivers.push({
        id: 1,
        gender: "female",
        first_name: "Samira",
        last_name: "Abou Samra",
        phone_number: "02255420",
        car_model: "BMW E39 2002",
        rating: 4
    });
    return new Promise((resolve, reject) => {
        resolve({
            body: {
                status: "success",
                drivers: driversExampleResponse.drivers
            }
        });
    });
}

/**
 * Requests approval from the client to the driver
 * This request is long-polled and waits for the driver's confirmation
 * @param {object} driver - the driver object
 * @param {integer} driver.id - the driver's ID 
 */
export function requestCandidateDriverApproval(driver) {
    return new Promise((resolve, reject) => {
        resolve({
            body: {
                status: "success",
                driverResponse: { accepted: true, driver: driver }
            }
        });
    });
}

/**
 * Sends a driver's approval of a trip request
 * @param {object} tripRequest - the trip request object
 * @param {object} tripRequest.start - start coords of the trip request
 * @param {double} tripRequest.start.lat - start latitude
 * @param {double} tripRequest.start.lng - start longtitude
 * @param {object} tripRequest.destination - same as start, but for the destination
 * @param {object} tripRequest.client - the client requesting the trip
 * @param {string} tripRequest.client.first_name - the first name of the client
 * @param {string} tripRequest.client.last_name - the last name of the client  
 */
export function acceptTripRequestAsync(tripRequest) {
    return new Promise((resolve, reject) => {
        resolve({ body: { status: "success" } });
    });
}

/**
 * Sends a driver's disapproval of a trip request
 * @param {object} tripRequest - the trip request object
 * @param {object} tripRequest.start - start coords of the trip request
 * @param {double} tripRequest.start.lat - start latitude
 * @param {double} tripRequest.start.lng - start longtitude
 * @param {object} tripRequest.destination - same as start, but for the destination
 * @param {object} tripRequest.client - the client requesting the trip
 * @param {string} tripRequest.client.first_name - the first name of the client
 * @param {string} tripRequest.client.last_name - the last name of the client  
 */
export function declineTripRequestAsync(driver) {
    return new Promise((resolve, reject) => {
        resolve({
            body: {
                status: "success"
            }
        });
    });
}