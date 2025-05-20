// To store tasks to display when you open the page or edit local storage content
let mainObject = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

// Display tasks from local storage
window.onload = () => {
  mainObject.tasks.forEach((task) => render(task));
};

// Get elements from index.html file
let textInput = document.querySelector('.form input[type="text"]');
let submitInput = document.querySelector('.form input[type="submit"]');
let tasks = document.querySelector(".tasks");
tasks.before(document.createComment(" Here my tasks "));

// Add the task and store it in local storage
submitInput.onclick = (e) => {
  e.preventDefault();

  let inputValue = textInput.value;
  if (inputValue.length > 0) {
    // Create a task object
    let newTask = {
      text: inputValue,
      id: Date.now(),
    };

    // Store to local storage and display the task
    mainObject.tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(mainObject.tasks));
    render(newTask);
    textInput.value = "";
  }
};

// Display the task on the screen
function render(task) {
  let divContainer = document.createElement("div");
  divContainer.className = "task-content";
  divContainer.setAttribute("task-id", task.id);

  let divText = document.createElement("div");
  divText.className = "task";
  divText.innerHTML = task.text;

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.innerHTML = "Delete";

  deleteButton.onclick = () => {
    // Update localStorage content and delete the task
    mainObject.tasks = mainObject.tasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(mainObject.tasks));
    divContainer.remove();
  };

  divContainer.appendChild(divText);
  divContainer.appendChild(deleteButton);
  // Add the task to the page
  tasks.appendChild(divContainer);
}
