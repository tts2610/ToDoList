let toDoList = [
    { isDone: false, content: 'Go to CoderSchool' },
    { isDone: false, content: 'Have lunch' },
    { isDone: false, content: 'Go Home' },
    { isDone: false, content: 'Play Game' },
];
let input;

$(document).ready(function() {
    updateDashboard();
})


$("#submitTo").click(function(params) {
    input = $("#todoInput").val();
    toDoList.push({ isDone: false, content: input });
})


function updateDashboard() {
    let div = $("#toDoList");
    toDoList.forEach((x, i) => {
        let html = '\
    <div class="row mt-2">\
        <div class="col-sm-1"><input class="form-check-input" type="checkbox" name="todo_' + i + '"></div>\
        <div class="col-sm-4" style="text-align:left;">' + x.content + '</div>\
        <div class="col-sm-2"><img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>\
    </div>'
        div.append(html);
    })
}

$('#toDoList').click(function() {
    alert("aaa");
    $.each(element => {
        if (element.is(':checked')) {
            element.css("text-decoration", "line-through");
        }
    });

});