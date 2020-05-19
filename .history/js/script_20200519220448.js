let toDoList = [];
let historyList = []
let input;

$(document).ready(function() {
    $("#todoInput").focus();
    getLocalStorage();
    updateDashboard(toDoList, 0);
    updateHistoryBoard();
    $('#delete').click(deleteVal);
})

$(document).on('keypress', function(e) {
    if (e.which == 13) {
        $("#submitTo").click();
    }
});


$("#submitTo").click(function(params) {
    input = $("#todoInput").val();
    toDoList.push({ isDone: false, content: input });
    saveLocalStorage();
    updateDashboard(toDoList, 0);
    $("#todoInput").val('')
    $("#todoInput").focus();

})

function reset() {
    updateDashboard(toDoList, 0);
}


function updateDashboard(myList, isFiltered) {
    let div = $("#toDoList");
    div.empty();
    $("#filtering").remove();
    myList.forEach((x, i) => {
        let html;
        if (x.isDone) {
            html = '\
                <div class="row mt-2">\
                    <div class="col-sm-1"><input class="form-check-input myCheckbox" type="checkbox" name="todo" id="' + i + '" checked></div>\
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
    if (isFiltered) {
        html = "<div id='filtering'></div>"
        div.append(html);
    }
}

$('#toDoList').click(function() {
    $.each($("input[name='todo']:checked"), function() {
        updateToDoListForCheckedBox($(this).attr("id"));
        $(this).parent().parent().find("#content").css("text-decoration", "line-through");
    });

    $.each($("input[name='todo']:not(:checked)"), function() {
        updateToDoListForUnCheckedBox($(this).attr("id"))
        $(this).parent().parent().find("#content").css("text-decoration", "none");
    });

    if ($("#filtering").length) {
        let arr = toDoList.filter(x => x.isDone == false);
        updateDashboard(arr, 0);
    }

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
    updateDashboard(toDoList, 0);

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
        <div class="col-sm-1" onclick="removeHistory(' + i + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;" ></div>\
    </div>'
        div.append(html);
    })
}

function revert(i) {
    insertToDo(historyList[i]);
    updateDashboard(toDoList, 0);
    historyList.splice(i, 1);
    updateHistoryBoard();
    saveLocalStorage();
}

function removeHistory(i) {
    confirm("This will remove permanently your item! Are you sure to continue?");
    historyList.splice(i, 1);
    saveLocalStorage();
    updateHistoryBoard();

}

function showDoneOrNotDone() {
    saveLocalStorage();
    let arr = toDoList.filter(x => x.isDone == false);
    console.log(arr);
    updateDashboard(arr, 1);

}

function saveLocalStorage() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    localStorage.setItem("historyList", JSON.stringify(historyList))
}

function getLocalStorage() {
    toDoList = JSON.parse(localStorage.getItem("toDoList") || "[]");
    historyList = JSON.parse(localStorage.getItem("historyList") || "[]");;
}

// {isDone:false,content:'Go to CoderSchool'},{isDone:false,content:'Have lunch'},{isDone:false,content:'Go Home'},{isDone:false,content:'Play Game'}