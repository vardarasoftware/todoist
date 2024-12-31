const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskTime = timeInput.value;

  if (!taskText || !taskDate || !taskTime) {
    alert("Please enter a task and date!");
    return;
  }

  const task = { text: taskText, date: taskDate, time: taskTime };

  saveTask(task);

  displayTask(task);

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
})

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));  
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(displayTask);
}

function displayTask(task) {

  let dateSection = document.querySelector(`[data-date="${task.date}"]`);


  if (!dateSection) {
    dateSection = document.createElement("div");
    dateSection.classList.add("date-section");
    dateSection.setAttribute("data-date", task.date);

    const dateHeading = document.createElement("h3");
    dateHeading.textContent = new Date(task.date).toLocaleDateString("en-GB");
    dateSection.appendChild(dateHeading);

    taskList.appendChild(dateSection);
  }
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `${task.text} ${task.time} 
        <button >Edit</button>
        <button >Delete</button>`;
        taskList.appendChild(taskItem);
  // handling current date issue
  // add task below date section
  // 
}
