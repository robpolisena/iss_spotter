// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coord) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log(coord);
      
    fetchISSFlyOverTimes(coord, (error, riseTime) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log(riseTime);
    });
  });
});