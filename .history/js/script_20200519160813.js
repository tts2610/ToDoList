let toDoList = [
    { isDone: false, content: 'Go to CoderSchool' },
    { isDone: false, content: 'Have lunch' },
    { isDone: false, content: 'Go Home' },
    { isDone: false, content: 'Play Game' },
];

let historyList = []
let input;

$(document).ready(function() {
    updateDashboard();
    $('#delete').click(deleteVal);
})


$("#submitTo").click(function(params) {
    input = $("#todoInput").val();
    toDoList.push({ isDone: false, content: input });
})


function updateDashboard() {
    let div = $("#toDoList");
    div.empty();
    toDoList.forEach((x, i) => {
        let html = '\
    <div class="row mt-2">\
        <div class="col-sm-1"><input class="form-check-input" type="checkbox" name="todo"></div>\
        <div class="col-sm-4" style="text-align:left;" id="content" id="' + i + '">' + x.content + '</div>\
        <div class="col-sm-2" onclick="deleteVal(' + i + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
    </div>'
        div.append(html);
    })
}

$('#toDoList').click(function() {
    $.each($("input[name='todo']:checked"), function() {
        console.log($(this).parent().parent().find(".content").text())

        // $(this).parent().parent().find("#content").append('<div class="col-sm-4" style="text-align:left;color:blue;">Done</div>')
        // alert($(this).parent().parent().find(".content").attr("id"));
        // updateToDoList($(this).parent().parent().find(".content").attr("id"))
        $(this).parent().parent().find("#content").css("text-decoration", "line-through");
    });

    $.each($("input[name='todo']:not(:checked)"), function() {
        $(this).parent().parent().find(".content").css("text-decoration", "none");
    });
});

function updateToDoList(i) {
    toDoList[i].isDone = true;
    updateDashboard();
}

function deleteVal(i) {

    insertHistory(toDoList[i]);
    updateHistoryBoard();

    toDoList.splice(i, 1);
    updateDashboard();

}

function insertHistory(element) {
    historyList.push(element)
}

function insertToDo(element) {
    toDoList.push(element);
}

function updateHistoryBoard() {
    let div = $("#historyList");
    div.empty();
    historyList.forEach((x, i) => {
        let html = '\
    <div class="row mt-2">\
        <div class="col-sm-1" onclick="removeHistory(' + i + ')"><input class="form-check-input" type="checkbox" name="todo"></div>\
        <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
        <div class="col-sm-2" onclick="revert(' + i + ')"><img class="ml-2" src="img/revert.png" width="30" height="30" style="cursor:pointer;"></div>\
    </div>'
        div.append(html);
    })
}

function revert(i) {
    insertToDo(historyList[i]);
    updateDashboard();
    historyList.splice(i, 1);
    updateHistoryBoard();
}

function removeHistory(i) {
    historyList.splice(i, 1);
    updateHistoryBoard();
}