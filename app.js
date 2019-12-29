// Define UI Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All Event Listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add Task Event
  form.addEventListener("submit", addTask);
  // Remove Task
  taskList.addEventListener("click", removeTask);
  // Clear Task Event
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}
// Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li Element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create TextNode and Append it to the li
    li.appendChild(document.createTextNode(task));
    // Create New Link Element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Add icon HTML
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}
// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li Element
  const li = document.createElement("li");
  li.className = "collection-item";
  // Create TextNode and Append it to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create New Link Element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // Add icon HTML
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear Input
  taskInput.value = "";
  console.log(li);
  alert("Task saved");
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove From LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Task
function clearTasks() {
  // taskList.innerHTML = "";

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from LS
  clearTaskFromLocalStorage();
}
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// Filter task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) == 0) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
