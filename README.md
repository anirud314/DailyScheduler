# 05 Third-Party APIs: Work Day Scheduler
## Report
### Project Link: https://anirud314.github.io/DailyScheduler/
### Summary
So this challenge requires us to take the given code for a work day scheduler and build upon it to make it display the current day; present timeblocks for that day; color code the time blocks for past present and future; enter text into each time block; use the save button to save the data; and have that data persist even after reloading the page. While writing this you can see that I broke it down into each objective using the acceptance criteria. I used this mindset to work on this project and set it up. It actually helped doing this while developing the project and working on this assignment
### Breaking down the project using both github issues and functions
To start off with I broke down this project into different features and used github issues to organize them at a basic level, kind of like how we worked on the project. The goal is to deliver something that works the same as what is being asked in the user story and the animation. So I worked with that in mind. I will go through each section in order and explain what I did for each code block. I will refer to them by their function name.
*** To start off with I will first define the global variables right here and sort of explain what is happening.

```
var dailySchedule =JSON.parse(localStorage.getItem("days-schedule"))||[];
```
this variable is defined as either an empty array or a item parsed from local storage ** I will go over why I did this in difficulties**

```
var currentDate = moment();
```
This initializes a currentDate value using moment.js

The first thing I did is work on defining and showing the current day in the Jumbotron. The code I used is this
```
var currentDay = function() {
    var currentDayEl = $("#currentDay")[0];
    currentDayEl.innerText = moment(currentDate).format("dddd MMMM Do, YYYY");
};
```
What I did here is simple, using jquery I targeted a element with the currentDay id in the html and assigned it as currentDayEl, I then changed the inner text of the element to match the currentDate using moment.js and its format function to format it into Day Month Date, Year format.

That was one feature done. from there I went on to work on the next feature which was to print out all of the timeblocks.

This got me to think of using a for loop to create elements for a list of time blocks. So since that was my solution and I didnt see a problem with it I decided to start from there

```
 var daySchedule = $("#daySchedule")[0];
    var taskList = $("<ul>").appendTo(daySchedule);
    for (var i = 0; i < 24; i++){
        createSchedule(taskList, i)
    }
```
I started off by adding this code into the currentDay function. This assigns the element with the id daySchedule to a variable which allowed me to create a ul element called task list that I could append to it. I then wrote a for loop that would iterate from 0-23 indicating 24 hours of a day. I wanted to keep my functions seperate because from past experience keeping them all clumped together caused me to lose track of what is doing what. so in the for loop I am calling a create schedule function while passing taskList and the i value through it.

The create schedule function is as follows

```
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
```
This is a long function but this function basically creates all of the elements for the schedule. each schedule block is a list item with an hourEl span a taskEl textarea and a saveBtnEl button appended to the listItem taskLi.
Using the for loop these are all appended to the taskList created in currentDay. After a test I saw that it worked, meaning I now need to move on to the next function.

The next function is the save and load functions. I will start by talking about the save function, because I had issues with the load function. Here is the code I wrote.

```
var saveSchedule = function(event){
    var blockHour = this.getAttribute("block-hr-id");
    var blockText = $("#event-"+blockHour).val();

    dailySchedule[blockHour].time = parseInt(blockHour);
    dailySchedule[blockHour].description = blockText;
    localStorage.setItem('days-schedule', JSON.stringify(dailySchedule));
};

```
We call this function using the saveBtnEl.click(saveSchedule) we wrote in the create schedule block. That means on each click of the saveBtnEl this function is called. This function first takes the click event and gets the attribute id of the button we assigned to it when it was constructed each button has a unique id that corresponds with the time value given to it. Using that value we found we can then find the text written in the select block by using the unique id created for the schedule block item. After that we parse the value of the buttons id into an int and assign it to time for the dailySchedule item at that index. we do the same for text as well. Then we use localStorage.setItem and JSON.stringify to stringify that array and send it to local storage. Which we can access and use by calling loadSchedule.

This is the code I tried to get to work for load schedule initially
Initially the global variable for dailySchedule was

```
var dailySchedule = []
```
And I used this loadSchedule function

```
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
```
This is loosely based off of what we did in the module project. first in this function we would parse the local storage into dailySchedule. I called the loadSchedule in create schedule, at the end of the function
if there is nothing in dailySchedule. make it an empty array. If there was something in the daily schedule change the value of the textarea's inner text into dailySchedule at position i's(which correlated with time) description. Otherwise create an scheduleObject that parses the i value as time and an empty description and push that into the dailySchedule array. I will go over the issue with this in the difficulties section but basically this caused a runtime error that required the user to constantly save one item and reload the page in order for it to work. Multiple Items cannot be saved.

Now i moved on to color coding the schedule for that I did something very simple.
for starters I called the function at the end of the create schedule function, after the loadSchedule function. This is the code for auditSchedule.

```
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
```
I pass the taskEl, and the i into the function and use the i for comparison and the taskEl to add classes to the element. Using moment.js and its format function I calculate the current hour using the currentDate global variable and converting it into hour format. If the hour is greater than the i value it is in the past. If it is the exact hour than it is in the present, else it is in the future.

From there I put it all together debugged everything and made some small adjustments, once that was all done I pushed it into my main branch and deployed
### Difficulties
The first difficulty is the loadSchedule function I made. Like I said it may have worked in compiling but it faced a huge runtime bug. The solution I had to this is to make the localStorage.getItem global along with the empty array declaration. Syntactically speaking that meant that dailySchedule is either an array created by localStorage.getItem(), OR an empty array. Thanks to that understanding and some research on the internet I was able to figure out that this was the best approach to go with
```
var dailySchedule =JSON.parse(localStorage.getItem("days-schedule"))||[];
```

I then updated my logic in loadSchedule into this
```
var loadSchedule = function(taskText, i) { 
    if(dailySchedule[i]){ 
        taskText[0].innerText = dailySchedule[i].description;
    }
    else { 

        var emptyScheduleObj = { 
            time: parseInt(i), 
            description: '' 
        }
        dailySchedule.push(emptyScheduleObj);
    }
};
```
And it worked without the bug, The bug was caused because initially this would create an undefined item and you can't assign text or any elements to something that is undefined.
### Screenshots
I just learned how to create an animated gif of the project so here I wont need to screenshot it

![My dayPlanner Demo](./Assets/img/readmeSS/projectWorking.gif)


## instructions
Create a simple calendar application that allows the user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

The starter code uses the [Moment.js](https://momentjs.com/) library to work with date and time, but feel free to use a different JavaScript solution to handle this functionality since Moment.js is considered a "legacy" project. Learn more about these other solutions in the [Moment.js project status page.](https://momentjs.com/docs/#/-project-status/)

## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

The following animation demonstrates the application functionality:

![day planner demo](./Assets/img/readmeSS/05-third-party-apis-homework-demo.gif)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
