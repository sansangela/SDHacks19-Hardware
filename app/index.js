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


// MESSAGEÍ
// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

// VIEW
let container = document.getElementById("container");

// Get the selected index
let currentIndex = container.value;

// Set the selected index
container.value = 0; // jump to first slide

// GEOLOCATION
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
  if (tempx >= 32 && tempx <= 33 && tempy >= -118 && tempy <= -116) {
    isInDangerous = true;
    console.log("*warning*");
    container.value = 1;
  }
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}


//button
import document from "document";

let counter = 1;
let mybutton = document.getElementById("mybutton");
if (mybutton){
  console.log("buttom exist");
  mybutton.onactivate = function(evt) {
    console.log("clicked " +counter+ " times");
    counter++;
    container.value = 2;
  }
}
let mybutton2 = document.getElementById("mybutton2");
if (mybutton2){
  console.log("buttom2 exist");
  mybutton2.onactivate = function(evt) {
    console.log("clicked " +counter+ " times");
    counter++;
    container.value = 0;
  }
}
