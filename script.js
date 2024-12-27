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

  if (!taskText || !taskDate || !taskTime) return;

  const task = { text: taskText, date: taskDate, time: taskTime };

  saveTask(task);

  displayTask(task);
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
