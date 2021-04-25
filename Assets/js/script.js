var officeHrs = {};
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
    var taskLi = $("<li>").appendTo(taskList);
    taskLi.addClass("row");
    taskLi.addClass("time-block");

    var hourEl = $("<span>").appendTo(taskLi);
    hourEl.addClass("col-1");
    hourEl.addClass("hour");
    hourEl[0].innerHTML = moment({hour: i}).format("h A");

    var taskEl = $("<textarea>");
    taskEl.addClass("col-10");
    taskEl.addClass();
    taskEl.attr("id", "event-"+ i);
    taskEl[0].innerText = "";
    taskLi.append(taskEl);

    var saveBtnEl = $("<button>").appendTo(taskLi);
    saveBtnEl.addClass("col-1 saveBtn oi oi-cloud-upload");
    saveBtnEl.attr("block-hr-id", i);
    saveBtnEl.click(saveSchedule);

};

var loadSchedule = function() {

};

var saveSchedule = function(){

};

var auditSchedule = function(){

};

currentDay();