let toDoList = [];
let historyList = []
let input;

$(document).ready(function() {
    getLocalStorage();
    updateDashboard(toDoList);
    $('#delete').click(deleteVal);
})


$("#submitTo").click(function(params) {
    input = $("#todoInput").val();
    toDoList.push({ isDone: false, content: input });
    saveLocalStorage();
    updateDashboard(toDoList);

})



function updateDashboard(myList) {
    let div = $("#toDoList");
    div.empty();
    myList.forEach((x, i) => {
        let html;
        if (x.isDone) {
            html = '\
            <div class="row mt-2">\
                <div class="col-sm-1"><input class="form-check-input myCheckbox" type="checkbox" name="todo" id="' + i + '"></div>\
                <div class="col-sm-4" style="text-align:left; text-decoration:line-through" id="content">' + x.content + '</div>\
                <div class="col-sm-2" onclick="deleteVal(' + i + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
            </div>'
        } else {
            html = '\
            <div class="row mt-2">\
                <div class="col-sm-1"><input class="form-check-input myCheckbox" type="checkbox" name="todo" id="' + i + '"></div>\
                <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
                <div class="col-sm-2" onclick="deleteVal(' + i + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
            </div>'
        }
        div.append(html);
    })
}

$('#toDoList').click(function() {
    $.each($("input[name='todo']:checked"), function() {
        updateToDoListForCheckedBox($(this).attr("id"));

        $(this).parent().parent().find("#content").css("text-decoration", "line-through");

        console.log(toDoList);
    });

    $.each($("input[name='todo']:not(:checked)"), function() {
        updateToDoListForUnCheckedBox($(this).attr("id"))
        $(this).parent().parent().find("#content").css("text-decoration", "none");
    });
});

function updateToDoListForCheckedBox(i) {
    if (!toDoList[i].isDone) {
        toDoList[i].isDone = true;
    }
    saveLocalStorage();
}

function updateToDoListForUnCheckedBox(i) {
    if (toDoList[i].isDone) {
        toDoList[i].isDone = false;
    }
    saveLocalStorage();
}

function deleteVal(i) {

    insertHistory(toDoList[i]);
    updateHistoryBoard();

    toDoList.splice(i, 1);
    updateDashboard(toDoList);

    saveLocalStorage();
}

function insertHistory(element) {
    historyList.push(element);
    saveLocalStorage();
}

function insertToDo(element) {
    toDoList.push(element);
    saveLocalStorage();
}

function updateHistoryBoard() {
    let div = $("#historyList");
    div.empty();
    historyList.forEach((x, i) => {
        let html = '\
    <div class="row mt-2">\
        <div class="col-sm-2" onclick="revert(' + i + ')"><img class="ml-2" src="img/revert.png" width="30" height="30" style="cursor:pointer;"></div>\
        <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
        <div class="col-sm-1" onclick="removeHistory(' + i + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
    </div>'
        div.append(html);
    })
}

function revert(i) {
    insertToDo(historyList[i]);
    updateDashboard(toDoList);
    historyList.splice(i, 1);
    updateHistoryBoard();
    saveLocalStorage();
}

function removeHistory(i) {
    historyList.splice(i, 1);
    saveLocalStorage();
    updateHistoryBoard();

}

function showDoneOrNotDone() {
    let arr = toDoList.filter(x => x.isDone == false);
    console.log(arr);
    saveLocalStorage();
    updateDashboard(arr);

}

function saveLocalStorage() {
    console.log(historyList)
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    localStorage.setItem("historyList", JSON.stringify(historyList))
}

function getLocalStorage() {
    toDoList = JSON.parse(localStorage.getItem("toDoList") || "[]");
    historyList = JSON.parse(localStorage.getItem("historyList") || "[]");;
}

// {isDone:false,content:'Go to CoderSchool'},{isDone:false,content:'Have lunch'},{isDone:false,content:'Go Home'},{isDone:false,content:'Play Game'}