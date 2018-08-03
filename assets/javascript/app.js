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

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();

  //------ maths 

  var firstTrain = $("#first-train").val().trim();

  var frequency = $("#frequency-input").val().trim();

  // convert time. push back 1 year
  var firstTrainConversion = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainConversion);

  //current time 
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  //time difference 
  var timeDiff = moment().diff(moment(firstTrainConversion), "minutes");
  console.log("difference in time: " + timeDiff);

  //time apart or remainder
  var timeRemain = timeDiff % frequency;
  console.log(timeRemain);

  //min until train
  var timeUntilTrain = frequency - timeRemain;
  console.log("min until train: " + timeUntilTrain);

  //next train
  // var nextTrain = moment().add(timeUntilTrain, "minutes");
  // console.log("arrival time: " + moment(newTrain).format("hh:mm"));




  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: frequency,
    minutes: timeUntilTrain,
    // nextTrainTime: nextTrain,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.nextTrainTime);
  // console.log(newTrain.minutes);


  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-train").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var minutes = childSnapshot.val().timeUntilTrain;
  // var nextTrainTime = childSnapshot.val().nextTrain;

  // train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(frequency);
  console.log(minutes);
  // console.log(nextTrainTime);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(frequency),
    $("<td>").text(minutes),
    // $("<td>").text(nextTrain)

  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

