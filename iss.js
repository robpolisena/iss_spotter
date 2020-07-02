const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url =  'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    const ip = data["ip"];
    if (error) {
      return callback(error, null);
    } // also ran verification test with response.statusCode != 200
    if (ip) {
      return callback(null, ip);
    }
  });
};

module.exports = { fetchMyIP };