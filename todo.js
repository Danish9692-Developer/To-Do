// todo.js

// Select DOM elements
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = []; // Array to store tasks

// Function to update task count
const updateCount = () => {
  taskCount.innerText = tasks.length;
};

// Function to render tasks
const renderTasks = () => {
  taskList.innerHTML = ""; // Clear previous tasks
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button class="completeBtn">✔</button>
        <button class="deleteBtn">✖</button>
      </div>
    `;
    // Attach data-index for event delegation
    li.dataset.index = index;
    taskList.appendChild(li);
  });
  updateCount();
};

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submit reload
  const taskName = input.value.trim();
  if (taskName === "") {
    alert("Please enter a task");
    return;
  }
  tasks.push({ name: taskName, completed: false });
  input.value = "";
  renderTasks();
});

// Event delegation for complete & delete
taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return; // click outside li
  const index = li.dataset.index;

  if (e.target.classList.contains("deleteBtn")) {
    tasks.splice(index, 1);
    renderTasks();
  } else if (e.target.classList.contains("completeBtn")) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }
});
