var taskList =
    [
        {"name":"Test Task #1","date":"12/01/2012","assigned":"john Doe"},
        {"name":"Test Task #2","date":"12/02/2012","assigned":"john Doe"},
        {"name":"Test Task #3","date":"12/03/2012","assigned":"john Doe"},
        {"name":"Test Task #4","date":"12/04/2012","assigned":"john Doe"},
        {"name":"Test Task #5","date":"12/05/2012","assigned":"john Doe"},
        {"name":"Test Task #6","date":"12/06/2012","assigned":"john Doe"},
        {"name":"Test Task #7","date":"12/07/2012","assigned":"john Doe"}
    ];

function generateHtml(taskJson) {
    var listElementHtml = $("<li><span id='name'>" + taskJson.name + "</span>" +
        "<span id='date'>" + taskJson.date + "</span>" +
        "<span id='assign'>" + taskJson.assigned + "</span></li>");

    return listElementHtml;
}

function getFormJson($form) {
    var dataArray,
        jsonData;

        dataArray = $form.serializeArray();
        jsonData = {};

    $.map(dataArray, function (n) {
        jsonData[n['name']] = n['value'];
    });

    return jsonData;
}

function changeDateFormat(oldDate) {
    var newDate,
        newMonth,
        newDay,
        newYear,
        regex,
        capGroups;

    regex = /(\d\d\d\d)-(\d\d)-(\d\d)/;
    capGroups = regex.exec(oldDate);

    newYear = capGroups[1];
    newMonth = capGroups[2];
    newDay = capGroups[3];
    newDate = newMonth+"/"+newDay+"/"+newYear;

    return newDate;
}

$(document).ready( function() {

    //set form submit listener
    $("#create-form").submit( function() {
        var formData,
            newTaskHtml;

        formData = getFormJson($('#create-form'));
        formData.date = changeDateFormat(formData.date);

        newTaskHtml = generateHtml(formData);
        newTaskHtml.prependTo('#task-list');

        return false;
    });

    //initalize the list of tasks
    for(var i = 0; i < taskList.length; i++) {
        var taskHtml = generateHtml(taskList[i]);
        taskHtml.appendTo('#task-list');
    }
});