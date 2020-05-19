let toDoList = [
    { isDone: false, content: 'Go to CoderSchool' },
    { isDone: false, content: 'Have lunch' },
    { isDone: false, content: 'Go Home' },
    { isDone: false, content: 'Play Game' },
];

let history = []
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
        <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
        <div class="col-sm-2" id="delete"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
    </div>'
        div.append(html);
    })
}

$('#toDoList').click(function() {
    $.each($("input[name='todo']:checked"), function() {
        console.log($(this).parent().parent().find("#content").text())
        $(this).parent().parent().find("#content").css("text-decoration", "line-through");
    });
});


function deleteVal() {
    alert("aaaa");
    let content = $(this).parent().find("#content").text();
    let removeIndex;
    toDoList.forEach((element, i) => {
        if (element.content === content) {
            removeIndex = i;
        }
    });
    toDoList.splice(removeIndex, 1);
    updateDashboard();

    insertHistory();
    updateHistoryBoard();
}

function insertHistory(element) {
    history.push({ content: element })
}

function updateHistoryBoard() {
    let div = $("#historyList");
    div.empty();
    history.forEach((x, i) => {
        let html = '\
    <div class="row mt-2">\
        <div class="col-sm-1"><input class="form-check-input" type="checkbox" name="todo"></div>\
        <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
        <div class="col-sm-2" id="delete"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
    </div>'
        div.append(html);
    })
}