const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskTime = timeInput.value;

  if (!taskText || !taskDate || !taskTime) {
    alert("Please fill in all fields.");
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

function displayTaskSection(title, tasks) {
  const sectionHeading = document.createElement("h2");
  sectionHeading.textContent = title;
  taskList.appendChild(sectionHeading);
  
  tasks.forEach(task => displayTask(task));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const currentDate = new Date().toISOString().split("T")[0];

  const dueTasks = tasks.filter(task => task.date < currentDate);
  const todayTasks = tasks.filter(task => task.date === currentDate);
  const upcomingTasks = tasks.filter(task => task.date > currentDate);

  taskList.innerHTML = "";

  if (dueTasks.length) {
    displayTaskSection("Due Tasks", dueTasks);
  }

  if (todayTasks.length) {
    displayTaskSection("Today Tasks", todayTasks);
  }

  if (upcomingTasks.length) {
    displayTaskSection("Upcoming Tasks", upcomingTasks);
  }
}

function displayTask(task) {
  
  const [hour, minute] = task.time.split(":");
  const taskTime = new Date();
  taskTime.setHours(hour, minute);

  const options = { hour: '2-digit', minute: '2-digit' };
  const formattedTime = taskTime.toLocaleTimeString('en-US', options)

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

  const taskContent = document.createElement("span");
  taskContent.textContent = `${task.text} ${formattedTime}`;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("task-button");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);
  
  taskItem.appendChild(taskContent);
  taskItem.appendChild(buttonContainer);
  dateSection.appendChild(taskItem);

  editBtn.addEventListener("click", () => editTask(task, taskItem));
  deleteBtn.addEventListener("click", () => deleteTask(task, taskItem));
}

function deleteTask(task, taskItem) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updatedTasks = tasks.filter(
    (taskToCheck) => 
      taskToCheck.text !== task.text || 
      taskToCheck.date !== task.date || 
      taskToCheck.time !== task.time
  );

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  taskItem.remove();
}

function editTask(task, taskItem) {
  const taskTextInput = document.createElement("input");
  taskTextInput.type = "text";
  taskTextInput.value = task.text;
  taskTextInput.className = "editable-task";

  const taskDateInput = document.createElement("input");
  taskDateInput.type = "date";
  taskDateInput.value = task.date;
  taskDateInput.className = "editable-date";

  const taskTimeInput = document.createElement("input");
  taskTimeInput.type = "time";
  taskTimeInput.value = task.time;
  taskTimeInput.className = "editable-time";

  taskItem.appendChild(taskTextInput);
  taskItem.appendChild(taskDateInput);
  taskItem.appendChild(taskTimeInput);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "save-btn";
  taskItem.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    const updatedText = taskTextInput.value.trim();
    const updatedDate = taskDateInput.value;
    const updatedTime = taskTimeInput.value;

    if (!updatedText || !updatedDate || !updatedTime) {
      alert("Please fill in all fields!");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(
      (taskToEdit) => 
        taskToEdit.text === task.text && 
        taskToEdit.date === task.date && 
        taskToEdit.time === task.time
        ? { ...taskToEdit, text: updatedText, date: updatedDate, time: updatedTime }
        : taskToEdit
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    task.text = updatedText;
    task.date = updatedDate;
    task.time = updatedTime;
    taskItem.innerHTML = `${updatedText} at ${updatedTime} 
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>`;

    const editBtn = taskItem.querySelector(".edit-btn");
    const deleteBtn = taskItem.querySelector(".delete-btn");
    editBtn.addEventListener("click", () => editTask(task, taskItem));
    deleteBtn.addEventListener("click", () => deleteTask(task, taskItem));

  });
}

searchInput.addEventListener("input", handleSearch);

function handleSearch(e) {
  const searchQuery = e.target.value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const currentDate = new Date().toISOString().split("T")[0];
 
  const filteredTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(searchQuery)
  );

  const dueTasks = filteredTasks.filter(task => task.date < currentDate);
  const todayTasks = filteredTasks.filter(task => task.date === currentDate);
  const upcomingTasks = filteredTasks.filter(task => task.date > currentDate);

  taskList.innerHTML = "";
  
  if (dueTasks.length) {
    displayTaskSection("Due Tasks", dueTasks);
  }
  
  if (todayTasks.length) {
    displayTaskSection("Today", todayTasks);
  }
  
  if (upcomingTasks.length) {
    displayTaskSection("Upcoming Tasks", upcomingTasks);
  }
}
