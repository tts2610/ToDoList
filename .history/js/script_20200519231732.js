let toDoList = [];
let historyList = []
let input;

$(document).ready(function() {
    $("#todoInput").focus();
    getLocalStorage();
    updateDashboard(toDoList);
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
    toDoList.push({ id: (toDoList.length == 0 ? 0 : toDoList[toDoList.length - 1].id + 1), isDone: false, content: input });
    console.log(toDoList)
    saveLocalStorage();
    updateDashboard(toDoList);
    $("#todoInput").val('')
    $("#todoInput").focus();

})

function reset() {
    getLocalStorage();
    updateDashboard(toDoList);
}


function updateDashboard(myList) {
    console.log(myList);
    let div = $("#toDoList");
    div.empty();
    myList.forEach((x, i) => {
        let html;
        if (x.isDone) {
            html = '\
                <div class="row mt-2">\
                    <div class="col-sm-1"><input class="form-check-input myCheckbox" type="checkbox" name="todo" id="' + x.id + '" checked></div>\
                    <div class="col-sm-4" style="text-align:left; text-decoration:line-through" id="content">' + x.content + '</div>\
                    <div class="col-sm-2" onclick="deleteVal(' + x.id + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
                </div>'
        } else {
            html = '\
                <div class="row mt-2">\
                    <div class="col-sm-1"><input class="form-check-input myCheckbox" type="checkbox" name="todo" id="' + x.id + '"></div>\
                    <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
                    <div class="col-sm-2" onclick="deleteVal(' + x.id + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
                </div>'
        }
        div.append(html);
    })
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

});

function updateToDoListForCheckedBox(i) {
    toDoList.forEach(element => {
        if (element.id == i && !element.isDone) {
            element.isDone = true;
        }
    });
    // if (!toDoList[i].isDone) {
    //     toDoList[i].isDone = true;
    // }
    saveLocalStorage();
}

function updateToDoListForUnCheckedBox(i) {
    toDoList.forEach(element => {
        if (element.id == i && !element.isDone) {
            element.isDone = false;
        }
    });
    saveLocalStorage();
}

function deleteVal(i) {
    let tempIndex;
    let tempDic;
    toDoList.forEach((element, il) => {
        if (element.id == i) {
            tempDic = element;
            tempIndex = il;
        }
    });
    insertHistory({ content: tempDic.content, isDone: tempDic.isDone });
    updateHistoryBoard();
    toDoList.splice(tempIndex, 1);
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
    if (historyList != null) {
        historyList.forEach((x, i) => {
            let html = '\
        <div class="row mt-2">\
            <div class="col-sm-2" onclick="revert(' + x.id + ')"><img class="ml-2" src="img/revert.png" width="30" height="30" style="cursor:pointer;"></div>\
            <div class="col-sm-4" style="text-align:left;" id="content">' + x.content + '</div>\
            <div class="col-sm-1" onclick="removeHistory(' + x.id + ')"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;" ></div>\
        </div>'
            div.append(html);
        })
    }

}

function revert(i) {
    let tempIndex;
    let tempDic;
    historyList.forEach((element, il) => {
        if (element.id == i) {
            tempDic = element;
            tempIndex = il;
        }
    });
    insertToDo({ id: (toDoList.length == 0 ? 0 : toDoList[toDoList.length - 1].id + 1), isDone: tempDic.isDone, content: tempDic.content });
    updateDashboard(toDoList);
    historyList.splice(tempIndex, 1);
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
    updateDashboard(arr);
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