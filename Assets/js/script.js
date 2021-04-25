var officeHrs = {};
var currentDate = moment();
var currentDay = function() {
    var currentDayEl = $("#currentDay")[0];
    currentDayEl.innerText = moment(currentDate).format("dddd MMMM Do, YYYY");
};
var createSchedule = function() {

};


var loadSchedule = function() {

};

var saveSchedule = function(){

};

var auditSchedule = function(){

};

currentDay();