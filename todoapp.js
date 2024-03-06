const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
// Function to add a task
// Function to add a task
function AddTask() {
    var inputbox = document.getElementById("input-box");
    var listcontainer = document.getElementById("list-container");
    
    if (inputbox.value === '') {
        alert("Please fill something!");
    } else {
        var taskText = inputbox.value.trim();
        var li = document.createElement("li");
        li.setAttribute("data-task", taskText);
        li.innerHTML = taskText + ' <span class="edit">&#9998;</span><span class="remove">X</span>';
        listcontainer.appendChild(li);
        saveData(); // Save tasks to localStorage
    }
    inputbox.value = "";
}

// Function to toggle the checked status of a task
document.getElementById("list-container").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save tasks to localStorage after toggling checked status
    }
}, false);

// Function to edit or remove a task
document.getElementById("list-container").addEventListener("click", function(e) {
    if (e.target.classList.contains('edit')) {
        e.stopPropagation();
        var taskLi = e.target.parentElement;
        var taskText = taskLi.getAttribute("data-task");
        var editText = prompt("Edit task:", taskText);
        if (editText !== null && editText.trim() !== '') {
            taskLi.setAttribute("data-task", editText);
            taskLi.innerHTML = editText + ' <span class="edit">&#9998;</span><span class="remove">X</span>';
            taskLi.classList.remove("checked"); // Remove "checked" class
            saveData(); // Save tasks to localStorage after editing
        }
    } else if (e.target.classList.contains('remove')) {
        var taskLi = e.target.parentElement;
        taskLi.remove();
        saveData(); // Save tasks to localStorage after removing
    }
}, false);


// Function to save tasks and their checked status to localStorage
function saveData() {
    var tasks = [];
    var checkedStatus = [];
    var listItems = document.querySelectorAll("#list-container li");
    listItems.forEach(function(item) {
        tasks.push(item.getAttribute("data-task"));
        checkedStatus.push(item.classList.contains("checked"));
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("checkedStatus", JSON.stringify(checkedStatus));
}

// Function to load tasks and their checked status from localStorage when the page loads
window.addEventListener("load", function() {
    var storedTasks = localStorage.getItem("tasks");
    var storedCheckedStatus = localStorage.getItem("checkedStatus");
    if (storedTasks && storedCheckedStatus) {
        var tasks = JSON.parse(storedTasks);
        var checkedStatus = JSON.parse(storedCheckedStatus);
        var listcontainer = document.getElementById("list-container");
        tasks.forEach(function(taskText, index) {
            var li = document.createElement("li");
            li.setAttribute("data-task", taskText);
            li.innerHTML = taskText + ' <span class="edit">&#9998;</span><span class="remove">X</span>';
            if (checkedStatus[index]) {
                li.classList.add("checked");
            }
            listcontainer.appendChild(li);
        });
    }
});
