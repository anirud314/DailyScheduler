//Global variables
var dailySchedule =JSON.parse(localStorage.getItem("days-schedule"))||[]; // dailySchedule is either empty or whatever is in local storage
// Calling this as a global value to avoid dailySchedule array becoming undefined which causes errors when inputting and saving values
//var dailySchedule = [];
var currentDate = moment(); // initialize current date using moment

var currentDay = function() { // currentDay function is meant to get and display the current day and build day's schedule
    var currentDayEl = $("#currentDay")[0];// the element in html with id current day
    currentDayEl.innerText = moment(currentDate).format("dddd MMMM Do, YYYY"); // sets inner text to the current date using moment.js and its .format function
    var daySchedule = $("#daySchedule")[0];// the element in html with id daySchedule
    var taskList = $("<ul>").appendTo(daySchedule);// creates an unique list called task list and appends it to daySchedule
    for (var i = 0; i < 24; i++){ // for all 24 hours in a day
        createSchedule(taskList, i); // calls create schedule function with taskList unique list and i as inputs
    }
};

var createSchedule = function(taskList, i) { // create schedule creates the day's schedule elements

    var taskLi = $("<li>") // creates a list element for each task
        .addClass("row") // adds class row
        .addClass("time-block") // adds class timeblock
        .appendTo(taskList); // appends it to taskList


    var hourEl = $("<span>") // creates an span element for each hour (used module project as an example for this)
        .addClass("col-1") // adds class col-1
        .addClass("hour")// adds class hour
        .appendTo(taskLi); // appends it to taskLi

    hourEl[0].innerHTML = moment({hour: i}).format("h A"); // formats the innerHTML of hourEl to the hour of the day

    var textEl = $("<textarea>") // creates a textarea element for the user to write their content into
        .addClass("col-10") // adds class col-10
        .addClass("description") // adds class description
        .attr("id", "event-"+ i); // adds an id attribute

    textEl[0].innerText = "";  // changes innerHTML of textEl to blank
    taskLi.append(textEl); // appends textEL to taskLi

    var saveBtnEl = $("<button>") // creates a button element
        .addClass("col-1 saveBtn oi oi-cloud-upload") // adds classes for button that are utilized for styling
        .attr("block-hr-id", i) // adds a unique id using the i variable from the for loop
        .click(saveSchedule) // event listener for click calls the saveSchedule function
        .appendTo(taskLi); // appends button to the taskLi
    
    loadSchedule(textEl, i); // passes the textEl and the i index to loadSchedule and calls loadSchedule
    auditSchedule(textEl, i); // passes the textEl and the i index to auditSchedule and calls it

};

var loadSchedule = function(taskText, i) { // function to load schedule from local storage and populate day using it.
   /* dailySchedule = JSON.parse(localStorage.getItem("days-schedule"));
    if(!dailySchedule) {
        dailySchedule = [];
    }*/ // I have to parse This globally otherwise it will pass in a null or undefined value, causing errors when trying to save on some cells.

    if(dailySchedule[i]){ // if dailySchedule at i has some values inside it
        taskText[0].innerText = dailySchedule[i].description;// assign the description to the task's inner html at the corresponding location
    }
    else { // else

        var emptyScheduleObj = { // create a object called empty schedule
            time: parseInt(i), // assign time by parsing in the value of i from the for loop
            description: '' // set the description to be empty
        }
        dailySchedule.push(emptyScheduleObj); // push these values into the dailySchedule array
    }

};

var saveSchedule = function(event){ // Function to save values into dailySchedule array and push it into local storage
    //console.log("Event was clicked: ", event);
    var blockHour = this.getAttribute("block-hr-id"); // block hour is equal to the id of the button clicked
    //console.log("blockHour = ", blockHour);
    var blockText = $("#event-"+blockHour).val(); // block text is the value of what is in the id of "event-" at where the button is pushed
    //console.log("blockText = ", blockText);
    //console.log(dailySchedule[blockHour]);
    dailySchedule[blockHour].time = parseInt(blockHour);// parses the blockhour as a time value into dailySchedule at the corresponding block hour
    dailySchedule[blockHour].description = blockText; // sets the description value in dailySchedule at the corresponding hour id to blockText
    localStorage.setItem('days-schedule', JSON.stringify(dailySchedule)); // local storage function to set values into days-schedule using JSON.stringify to make it readable for local storage
};

var auditSchedule = function(taskText, iHour){ // This function color codes the schedule based on hours
    if(moment(currentDate).format("H") > iHour){ // if the current date's hour is greater than the hour for that taskEl
        taskText.addClass("past");// add class past which makes the color of textarea white
    }
    else if(moment(currentDate).format("h A") === moment({hour: iHour}).format("h A")){ // if the current date's hour is equal to the hour for the taskEl
        taskText.addClass("present"); // add class present to taskText which makes the color of the textarea red
    }
    else { // else (future Items, or hours that havent passed yet)
        taskText.addClass("future"); // add class future to taskText making the textarea green
    }
};


currentDay(); // call the currentDay function
