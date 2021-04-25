var dailySchedule =JSON.parse(localStorage.getItem("days-schedule"))||[]; // Calling this as a global value to avoid dailySchedule array becoming undefined which causes errors when inputting and saving values
//var dailySchedule = [];
var currentDate = moment();
var currentDay = function() {
    var currentDayEl = $("#currentDay")[0];
    currentDayEl.innerText = moment(currentDate).format("dddd MMMM Do, YYYY");
    var daySchedule = $("#daySchedule")[0];
    var taskList = $("<ul>").appendTo(daySchedule);
    for (var i = 0; i < 24; i++){
        createSchedule(taskList, i);
    }
};

var createSchedule = function(taskList, i) {

    var taskLi = $("<li>")
        .addClass("row")
        .addClass("time-block")
        .appendTo(taskList);


    var hourEl = $("<span>")
        .addClass("col-1")
        .addClass("hour")
        .appendTo(taskLi);

    hourEl[0].innerHTML = moment({hour: i}).format("h A");

    var textEl = $("<textarea>")
        .addClass("col-10")
        .addClass()
        .attr("id", "event-"+ i);

    textEl[0].innerText = "";
    taskLi.append(textEl);

    var saveBtnEl = $("<button>")
        .addClass("col-1 saveBtn oi oi-cloud-upload")
        .attr("block-hr-id", i)
        .click(saveSchedule)
        .appendTo(taskLi);
    
    loadSchedule(textEl, i);
    auditSchedule(textEl, i);

};

var loadSchedule = function(taskText, i) {
   /* dailySchedule = JSON.parse(localStorage.getItem("days-schedule"));
    if(!dailySchedule) {
        dailySchedule = [];
    }*/ // I have to parse This globally otherwise it will pass in a null or undefined value, causing errors when trying to save on some cells.

    if(dailySchedule[i]){
        taskText[0].innerText = dailySchedule[i].description;
    }
    else {

        var scheduleObject = {
            time: parseInt(i),
            description: ''
        }
        dailySchedule.push(scheduleObject);
    }

};

var saveSchedule = function(event){
    console.log("Event was clicked: ", event);
    var blockHour = this.getAttribute("block-hr-id");
    console.log("blockHour = ", blockHour);
    var blockText = $("#event-"+blockHour).val();
    console.log("blockText = ", blockText);
    console.log(dailySchedule[blockHour]);
    dailySchedule[blockHour].time = parseInt(blockHour);
    dailySchedule[blockHour].description = blockText;
    localStorage.setItem('days-schedule', JSON.stringify(dailySchedule));
};

var auditSchedule = function(taskText, iHour){
    if(moment(currentDate).format("H") > iHour){
        taskText.addClass("past");
    }
    else if(moment(currentDate).format("h A") === moment({hour: iHour}).format("h A")){
        taskText.addClass("present");
    }
    else {
        taskText.addClass("future");
    }
};


currentDay();

