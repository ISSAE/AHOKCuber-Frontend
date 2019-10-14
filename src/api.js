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
        resolve({body: {status: "success"}});
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
        resolve({body: {status: "success"}});
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
        resolve({body: {status: "success", client: {
            gender: "male",
            first_name: "Adnan",
            last_name: "Hamzeh",
            username: "adnan_hamzeh",
            password: "password",
            phone_number: "01390390019",
        }}});
    });
    // TODO get authenticated user endpoint
}

/**
 * Get authenticated client
 */
export function getAuthenticatedDriverAsync() {
    return new Promise((resolve, reject) => {
        resolve({body: {status: "success", driver: {
            gender: "male",
            first_name: "Adnan",
            last_name: "Hamzeh",
            username: "adnan_hamzeh",
            password: "password",
            phone_number: "01390390019",
            car_model: "Renault Clio 2010",
            car_registration_number:  "T 1029303"
        }}});
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
        resolve({body: {status: "success"}});
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
        resolve({body: {status: "success"}});
    });    
}