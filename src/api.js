/**
 * Sends a user registration request 
 * @param {object} payload - The user data
 * @param {string} payload.firstname
 * @param {string} payload.lastname
 * @param {string} payload.phone
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} payload.sex - Either "male" or "female"
 */
export function registerAsync(payload) {
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