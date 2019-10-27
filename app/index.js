console.log('Hello world!');

import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import { geolocation } from "geolocation";


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


//button
import document from "document";

let counter = 1;
let mybutton = document.getElementById("mybutton");
if (mybutton){
  console.log("buttom exist");
  mybutton.onactivate = function(evt) {
    console.log("clicked " +counter+ " times");
    counter++;
  }
}
