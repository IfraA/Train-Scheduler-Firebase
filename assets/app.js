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

  //call moment function
  momentCal();

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
});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().firstTrain);
  console.log(snapshot.val().arrival);
  console.log(snapshot.val().frequency);
  console.log(snapshot.val().minsAway);

  $("#current-train").append("<tbody>");
  $("#current-train").append("<tr>");

  $("#current-employee").append("<td>" + snapshot.val().name + "</td>");
  $("#current-employee").append("<td>" + snapshot.val().destination + "</td>");
  $("#current-employee").append("<td>" + snapshot.val().firstTrain + "</td>");
  $("#current-employee").append("<td>" + snapshot.val().arrival + "</td>");
  $("#current-employee").append("<td>" + snapshot.val().frequency + "</td>");
  $("#current-employee").append("<td>" + snapshot.val().minsAway + "</td>");
});

function momentCal() {
  //push back 1 year
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(currentTime), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var minsAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minsAway);

  // Next Train
  var arrival = moment().add(minsAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(arrival).format("hh:mm"));
}

//assumption
// var frequency = 3;

// // Time is 3:30 AM
// var firstTrain = "03:30";

// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
// console.log(firstTrainConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(currentTime), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % frequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = frequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var arrival = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(arrival).format("hh:mm"));
