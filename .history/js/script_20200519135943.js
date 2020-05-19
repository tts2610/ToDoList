let toDoList = [
    { isDone: false, content: 'Go to CoderSchool' },
    { isDone: false, content: 'Have lunch' },
    { isDone: false, content: 'Go Home' },
    { isDone: false, content: 'Play Game' },
];
let input;

$(document).ready(function() {
    // updateDashboard();
})


$("#submitTo").click(function(params) {
    input = $("#todoInput").val();
    toDoList.push({ isDone: false, content: input });
})


function updateDashboard() {
    let div = $("#toDoList");
    toDoList.forEach((x, i) => {
        let html = '<div class="mt-2" id="todo_' + i + '">' + '<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">' + x.content + '<img class="ml-2" src="img/cross.png" width="25" height="25" style="cursor:pointer;"></div>'
        div.append(html);
    })
}