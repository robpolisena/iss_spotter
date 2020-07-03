const request = require('request');

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

const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch IP address from ipvigilante API
  const url =  'https://ipvigilante.com/' + ip;

  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    const lat = data.data.latitude;
    const long = data.data.longitude;
    const coord = {
      "Latitude": lat,
      "Longitude": long
    };
    if (error) {
      return callback(error, null);
    } // also ran verification test with response.statusCode != 200
    if (lat && long) {
      return callback(null, coord);
    }
  });
};

const fetchISSFlyOverTimes = function(coord, callback) {
  // use request to fetch ridetime and duration with open notify API
  const lta = coord["Latitude"];
  const lon = coord["Longitude"];
  const url =  `http://api.open-notify.org/iss-pass.json?lat=${lta}&lon=${lon}`;
  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    const riseTime = data.response;
    if (error) {
      return callback(error, null);
    } // also ran verification test with response.statusCode != 200
    if (riseTime) {
      return callback(null, riseTime);
    }
  });
};

module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes };