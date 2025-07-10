let value = document.querySelector("#input-value");
let addBtn = document.querySelector(".firstButton");
let container = document.querySelector("#listOfTodo");
let completedTask = document.querySelector(".completedTasks");
let allTask = document.querySelector(".allTasks");
let pendingTask = document.querySelector(".pendingTasks");
let removeAll = document.querySelector(".removeAll")

let taskData = JSON.parse(localStorage.getItem("task")) || [];


function render() {
    container.innerHTML = "";
    taskData.forEach((task) => {
        container.append(createTaskElement(task));
    });
}


function renderedTasks(taskArray){
    container.innerHTML = "";
    taskArray.forEach((task) => {
        container.append(createTaskElement(task));
    });
}


// ✅ Reusable task element creation
function createTaskElement(task) {
    let createEle = document.createElement("li");
    let createBtn = document.createElement("button");
    let createCheckBox = document.createElement("input");

    createCheckBox.type = "checkbox";
    createCheckBox.classList.add("markComplete");
    createCheckBox.checked = task.isComplete;

    if (createCheckBox.checked) {
        createEle.style.textDecoration = "line-through";
        createEle.style.color= "#bdbdbd";
    }

    createEle.innerText = task.task;
    createEle.setAttribute("data-id", task.id);

    createBtn.innerText = "Remove";
    createBtn.classList.add("remove-button");
    createBtn.style.marginLeft = "30px";

    createEle.append(createBtn);
    createEle.prepend(createCheckBox);

    return createEle;
}

value.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addTask();
    }
});

function addTask() {
    let taskValue = value.value.trim();
    if (taskValue == "") {
        alert("EMPTY INPUT FIELD");
    } else {
        let Data = {
            task: taskValue,
            id: taskData.length + 1,
            isComplete: false
        }
        taskData.push(Data);
        saveAndRender();
        value.value = "";
    }
}
addBtn.addEventListener("click", addTask);

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
        let findId = e.target.parentElement.getAttribute("data-id");
        e.target.parentElement.remove();
        removeTaskOut(Number(findId));
    }
});
function removeTaskOut(buttonId) {
    let filterOut = taskData.filter(tasks => Number(tasks.id) !== Number(buttonId));
    taskData = filterOut;
    saveAndRender();
}

//Update the isComplete to true / false in local storage.
container.addEventListener("change", (e) => {
    if (e.target.classList.contains("markComplete")) {
        let markId = e.target.parentElement.getAttribute("data-id");
        completedMark(Number(markId));
    }
});
function completedMark(markId) {
    let findCheckBoxEle = taskData.find(tasks => Number(tasks.id) == Number(markId));
    findCheckBoxEle.isComplete = !findCheckBoxEle.isComplete;
    saveAndRender();
}


// Show All tasks
allTask.addEventListener("click", () => {
    saveAndRender();
});


//Show Pending tasks
pendingTask.addEventListener("click", () => {
    let values = false;
    filterPendingTasks(values); 
});
function filterPendingTasks(values) {
    let filterPendingTask = taskData.filter(task => task.isComplete == values);
    renderedTasks(filterPendingTask)
}



// Show completed Tasks
completedTask.addEventListener("click", () => {
    let values = true;
    filterCompletedTasks(values)
    
});
function filterCompletedTasks(values) {
    let filterCompletedTask = taskData.filter(task => task.isComplete == values);
    renderedTasks(filterCompletedTask)
}

removeAll.addEventListener("click" , () => {
    if(confirm("Are you sure to want remove all tasks?")){

        taskData = []
        saveAndRender()
    }
})

function saveAndRender() {
    localStorage.setItem("task", JSON.stringify(taskData));
    render();
}
saveAndRender()