// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-button");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage when the page loads
  loadTasks();

  // Add event listener for the Add Task button
  addButton.addEventListener("click", addTask);

  // Add event listener for Enter key in the input field
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Function to load tasks from local storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => createTaskElement(taskText, false));
  }

  // Function to add a new task
  function addTask() {
    // Retrieve and trim the value from the task input field
    const taskText = taskInput.value.trim();

    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create a new li element
    const li = document.createElement("li");
    li.className = "task-item";
    
    // Create a span for the task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Create a new button element for removing the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Assign onclick event to remove button
    removeButton.onclick = function() {
      li.remove();
    };

    // Append the remove button to the li element
    li.appendChild(removeButton);

    // Append the li to taskList
    taskList.appendChild(li);

    // Clear the task input field
    taskInput.value = "";
  }

  // Function to create a task element
  function createTaskElement(taskText, saveToStorage) {
    // Create list item
    const li = document.createElement("li");
    li.className = "task-item";

    // Create task text span
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.className = "remove-btn";
    removeButton.textContent = "Remove";

    // Add click event to remove button
    removeButton.addEventListener("click", () => {
      li.remove();
      if (saveToStorage) {
        updateLocalStorage();
      }
    });

    // Append elements to list item
    li.appendChild(taskSpan);
    li.appendChild(removeButton);

    // Append list item to task list
    taskList.appendChild(li);

    // Save to local storage if needed
    if (saveToStorage) {
      updateLocalStorage();
    }
  }

  // Function to update local storage
  function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map((li) => li.querySelector("span").textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
