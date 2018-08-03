 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDp9YourfeDGYh7QP7XnxoNgHkp9g_yhLk",
    authDomain: "bidd-52300.firebaseapp.com",
    databaseURL: "https://bidd-52300.firebaseio.com",
    projectId: "bidd-52300",
    storageBucket: "bidd-52300.appspot.com",
    messagingSenderId: "482767682468"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Button to add trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

// Grabbing the user input
  var shinkanTrain = $("#train-input").val();
  var shinkanDest = $("#destination-input").val();
  var shinkanTime = moment($("#firstTime-input").val(), "HH:mm");
  var shinkanFreq = $("#frequency-input").val();

  //converting the user time by pushing back 1 year so it comes to current time 
  var shinkanConTime = moment(shinkanTime, "hh:mm").subtract(1, "years");
  console.log(shinkanConTime);

  //current time 
  var currentTime = moment();
  console.log ("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //difference between user entered time and current time 
  var timeDiff = moment().diff(moment(shinkanConTime), "minutes");
  console.log("DIFFERENCE IN TIME: " + timeDiff);

  //time apart / remainder for future freq calc
  var timeRemain = timeDiff % shinkanFreq; 
  console.log (timeRemain);

  //minutes until train 
  var timeMinNextShinkan = shinkanFreq - timeRemain; 
  console.log("MIN TILL TRAIN: " + timeMinNextShinkan);

  // next train
  var nextShinkan = moment().add(timeMinNextShinkan, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextShinkan).format("hh:mm"));

// Creating local "temporary" object for holding train info
  var newTrain = {
    train: shinkanTrain,
    destination: shinkanDest,
    time: shinkanTime,
    frequency: shinkanFreq,
    next: nextShinkan, 
    nexttime: timeMinNextShinkan
  };

// Upload train info to database 

console.log(shinkanTrain);


  database.ref().push(newTrain);

//log everything to console. testing
  console.log(shinkanTrain.train);
  console.log(shinkanDest.destination);
  console.log(shinkanTime.time);
  console.log(shinkanFreq.frequency);

//alert that an employee has been successfully added
  alert("Train successfully added");

// clear inputs from the text boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#frequency-input").val("");
});

// firebase event for adding train to the database
// also adding rows in our table from what the user added in the form 
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

// storing everything into a variable 
  var shinkanTrain = childSnapshot.val().train;
  var shinkanDest = childSnapshot.val().destination;
  var shinkanTime = childSnapshot.val().time;
  var shinkanFreq = childSnapshot.val().frequency;
  var nextShinkan = childSnapshot.val().next;
  var timeMinNextShinkan = childSnapshot.val().nexttime;


// train info console.log
  console.log(shinkanTrain);
  console.log(shinkanDest);
  console.log(nextShinkan);
  console.log(timeMinNextShinkan);

// // moment calculations for the next arrival
//   var shinkanNextArrival = moment.unix(shinkanStart).format("HH:mm");

// // moment calculations for minuets away
//   var shinkanMinutesAway = moment().diff(moment(shinkanStart, "X"), "months");
//   console.log(shinkanMonths);

// creating a new row for the DOM
  var newRow = $("<tr>").append(
    $("<td>").text(shinkanTrain),
    $("<td>").text(shinkanDest),
    $("<td>").text(shinkanFreq),
    $("<td>").text(nextShinkan),
    $("<td>").text(timeMinNextShinkan),
  );

// appending the new row to the body 
  $("#train-table > tbody").append(newRow);
});

// Math 
//--------------------------------------------
