console.log('Hello world!');

import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import { geolocation } from "geolocation";

// CLOCK
// Update the clock every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

// Update the clock every tick event
clock.ontick = () => updateClock();


// MESSAGE
// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}


// GEOLOCATION
// geolocation.getCurrentPosition(locationSuccess, locationError);

// function locationSuccess(position) {
//     console.log("Latitude: " + position.coords.latitude,
//                 "Longitude: " + position.coords.longitude);
// }

// function locationError(error) {
//   console.log("Error: " + error.code,
//               "Message: " + error.message);
// }

var watchID = geolocation.watchPosition(locationSuccess, locationError);

var inputx = []; // initialise an empty array
var inputy = [];
var isInDangerous = false;

function locationSuccess(position) {

  // console.log("Latitude: " + position.coords.latitude,
  //             "Longitude: " + position.coords.longitude);
  
  var tempx = position.coords.latitude, tempy = position.coords.longitude;
  inputx.push(tempx);  // the array will dynamically grow
  inputy.push(tempy);
  console.log(tempx + "," + tempy);
  if (((tempx*100-3277.9133333333334)^2+(tempy*100+11717.1645)^2) <= 5) {
    console.log("*warning*");
  }
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}