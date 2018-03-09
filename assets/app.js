//Initialize Firebase
var config = {
  apiKey: "AIzaSyAVkz8AQGonZnVS8LOOZevy6c4fuoJuA9E",
  authDomain: "train-schedule-d0102.firebaseapp.com",
  databaseURL: "https://train-schedule-d0102.firebaseio.com",
  projectId: "train-schedule-d0102",
  storageBucket: "train-schedule-d0102.appspot.com",
  messagingSenderId: "87853022855",
};
firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var destination = "";
var firstTrain = 0;
var arrival = 0;
var frequency = 0;
var minsAway = 0;

$("#add-train").on("click", function() {
  event.preventDefault();
  //moment.js

  name = $("#name")
    .val()
    .trim();
  //   .trim();
  destination = $("#destination")
    .val()
    .trim();
  // .trim();
  firstTrain = $("#firstTrain")
    .val()
    .trim();
  // .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  momentCal();
});

function momentCal() {
  //push back 1 year
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var time = moment();
  console.log("CURRENT TIME: " + moment(time).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  minsAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minsAway);

  // Next Train
  arrival = moment().add(minsAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(arrival).format("hh:mm"));
  arrival = moment(arrival).format("hh:mm");

  var newTrain = {
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    arrival: arrival,
    minsAway: minsAway,
  };
  console.log(newTrain);
  //push the input to database
  database.ref().push(newTrain);
}

database.ref().on("child_added", function(snapshot) {
  var childOrigTime = snapshot.val().firstTime;
  var childFreq = snapshot.val().frequency;
  //   updateTimes(childOrigTime, childFreq);

  $("#current-train").append("<tbody>");
  $("#current-train").append("<tr>");

  $("#current-train").append("<td>" + snapshot.val().name + "</td>");
  $("#current-train").append("<td>" + snapshot.val().destination + "</td>");
  $("#current-train").append("<td>" + snapshot.val().frequency + "</td>");
  $("#current-train").append("<td>" + arrival + "</td>");
  $("#current-train").append("<td>" + minsAway + "</td>");

  $("#current-train").append("</tbody>");
  $("#current-train").append("</tr>");
});
//THIS FUNCTION DID NOT WORK FOR NOW. update the arrival time was time passes. It kept giivng me NaN

// function updateTimes(origTime, freq) {
//   var firstTimeConverted = moment(origTime, "HH:mm").subtract(1, "years");
//   var time = moment();
//   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

//   // Time apart (remainder)
//   var tRemainder = diffTime % freq;

//   // Minute Until Train
//   minsAway = freq - tRemainder;
//   console.log("UPDATED MINUTES TILL TRAIN: " + minsAway);

//   // Next Train
//   arrival = moment().add(minsAway, "minutes");
//   console.log("UPDATED ARRIVAL TIME: " + moment(arrival).format("hh:mm"));
//   arrival = moment(arrival).format("hh:mm");
// }
