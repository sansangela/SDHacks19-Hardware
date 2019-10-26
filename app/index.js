console.log('Hello world!');

import clock from "clock";
import document from "document";
// Import the messaging module
import * as messaging from "messaging";

// CLOCK
let myClock = document.getElementById("myClock");

clock.granularity = 'seconds'; // seconds, minutes, hours

clock.ontick = function(evt) {
  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                      ("0" + evt.date.getSeconds()).slice(-2);
};

// MESSAGEÍ
// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}