let toDoList = [
    { isDone: false, content: 'Go to CoderSchool' },
    { isDone: false, content: 'Have lunch' },
    { isDone: false, content: 'Go Home' },
    { isDone: false, content: 'Play Game' },
];

let historyList = []
let input;

$(document).ready(function() {
    updateDashboard(toDoList);
    $('#delete').click(deleteVal);
})


$("#submitTo").click(function(params) {
    input = $("#todoInput").val();
    toDoList.push({ isDone: false, content: input });
})


function updateDashboard(list) {
    let div = $("#toDoList");
    div.empty();
    console.log(list)
    list.forEach((x, i) => {
        let html;
        if (!x.isDone) {
            html = '\
    <div class="row mt-2">\
        <div class="col-sm-1"><input class="form-check-input" type="checkbox" name="todo" id="' + i + '"></div>\
        <div class="col-sm-4" style="text-align:left;" id="content" style"text-decoration:line-through;">' + x.content + '</div>\
        <div class="col-sm-2" onclick="deleteVal(' + i + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
    </div>'
        } else {
            html = '\
    <div class="row mt-2">\
        <div class="col-sm-1"><input class="form-check-input" type="checkbox" name="todo" id="' + i + '"></div>\
        <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
        <div class="col-sm-2" onclick="deleteVal(' + i + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
    </div>'
        }
        div.append(html);
    })
}

$('#toDoList').click(function() {
    $.each($("input[name='todo']:checked"), function() {
        updateToDoList($(this).attr("id"));
        $(this).parent().parent().find("#content").css("text-decoration", "line-through");
    });

    $.each($("input[name='todo']:not(:checked)"), function() {
        $(this).parent().parent().find("#content").css("text-decoration", "none");
    });
});

function updateToDoList(i) {
    toDoList[i].isDone = toDoList[i].isDone ? false : true;
    updateDashboard(toDoList);
}

function deleteVal(i) {

    insertHistory(toDoList[i]);
    updateHistoryBoard();

    toDoList.splice(i, 1);
    updateDashboard(toDoList);

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
    updateDashboard(toDoList);
    historyList.splice(i, 1);
    updateHistoryBoard();
}

function removeHistory(i) {
    historyList.splice(i, 1);
    updateHistoryBoard();
}

function showDoneOrNotDone() {
    let arr = toDoList.filter(x => x.isDone == true);
    updateDashboard(arr);

}