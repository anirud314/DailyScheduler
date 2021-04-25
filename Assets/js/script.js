var dailySchedule = [];
var currentDate = moment();
var currentDay = function() {
    var currentDayEl = $("#currentDay")[0];
    currentDayEl.innerText = moment(currentDate).format("dddd MMMM Do, YYYY");
    var daySchedule = $("#daySchedule")[0];
    var taskList = $("<ul>").appendTo(daySchedule);
    for (var i = 0; i < 24; i++){
        createSchedule(taskList, i)
    }
};

var createSchedule = function(taskList, i) {

    var taskLi = $("<li>")
        .addClass("row")
        .addClass("time-block")
        .appendTo(taskList);


    var hourEl = $("<div>")
        .addClass("col-1")
        .addClass("hour")
        .appendTo(taskLi);

    hourEl[0].innerHTML = moment({hour: i}).format("h A");

    var taskEl = $("<textarea>")
        .addClass("col-10")
        .addClass()
        .attr("id", "event-"+ i);

    taskEl[0].innerText = "";
    taskLi.append(taskEl);

    var saveBtnEl = $("<button>")
        .addClass("col-1 saveBtn oi oi-cloud-upload")
        .attr("block-hr-id", i)
        .click(saveSchedule)
        .appendTo(taskLi);
    
    loadSchedule(taskEl, i);

};

var loadSchedule = function(taskEl, i) {
    dailySchedule = JSON.parse(localStorage.getItem("days-schedule"));
    console.log(dailySchedule);
    if(!dailySchedule) {
        dailySchedule = [];
    }

    if(dailySchedule[i]){
        taskEl[0].innerText = dailySchedule[i].description;
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
    var blockHour = this.getAttribute("block-hr-id");
    var blockText = $("#event-"+blockHour).val();

    dailySchedule[blockHour].time = parseInt(blockHour);
    dailySchedule[blockHour].description = blockText;
    localStorage.setItem('days-schedule', JSON.stringify(dailySchedule));
};

var auditSchedule = function(){

};


currentDay();

