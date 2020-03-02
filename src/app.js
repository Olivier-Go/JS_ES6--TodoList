import "./style.css";

const app = {
  // Define task list
  tasks: [],

  // Define task count
  count: 0,

  init: function() {
    // Define todo app container
    app.todo = document.getElementById("todo");
    // Create a form task input element
    app.createFormElement();
    // Create the todo list
    app.createTodoListElement();
  },

  //  Create a form element
  createFormElement: () => {
    const formElement = document.createElement("form");
    formElement.id = "todo__form";
    app.todo.appendChild(formElement);
    const inputElement = document.createElement("input");
    inputElement.id = "todo__input";
    inputElement.type = "text";
    inputElement.name = "task";
    inputElement.placeholder = "Ajouter une tâche";
    formElement.appendChild(inputElement);

    // Listen task submit form
    formElement.addEventListener("submit", app.handleSubmitTask);
  },

  // Create todo list
  createTodoListElement: () => {
    // Create the header
    const divElement = document.createElement("div");
    divElement.id = "todo__task";
    app.todo.appendChild(divElement);
    const titleElement = document.createElement("h2");
    titleElement.id = "todo__title";
    titleElement.innerHTML = `<span>${app.displayTaskNumber()}</span> tâches en cours`;
    divElement.appendChild(titleElement);

    // Create the list
    const ulElement = document.createElement("ul");
    ulElement.id = "todo__list";
    app.todo.appendChild(ulElement);
    app.createTaskList();
  },

  // Create the task list
  createTaskList: () => {
    const liElement = document.createElement("li");
    liElement.className = "todo__list-item";
    const inputElement = document.createElement("input");
    const taskContent = document.createElement("span");

    app.tasks.forEach(task => {
      inputElement.type = "checkbox";
      taskContent.textContent = task;
      app.todo.appendChild(liElement);
      liElement.appendChild(inputElement);
      liElement.appendChild(taskContent);
      // Create input click listener for complete
      app.bindTaskListeners(liElement);
    });
  },

  handleSubmitTask: evt => {
    evt.preventDefault();
    // Get input value and save it if not empty
    let inputElement = evt.currentTarget.firstChild;
    if (inputElement.value.trim() !== "") {
      app.tasks.push(inputElement.value);
      // Actualize number of task in title
      let taskNumber = document.querySelector("#todo__title > span");
      app.count += 1;
      taskNumber.textContent = app.displayTaskNumber();
      // Add task to the tack list
      app.createTaskList();
      // Reset input value after adding task and set focus to add task input
      inputElement.value = "";
      inputElement.focus();
    }
  },

  handleCompleteTask: evt => {
    // Check the checkbox task input if task is complete
    const taskElement = evt.currentTarget;
    let taskNumber = document.querySelector("#todo__title > span");
    taskElement.classList.toggle("task-complete");

    if (taskElement.classList.contains("task-complete")) {
      taskElement.firstChild.checked = "checked";
      app.count -= 1;
      // Actualize number of task in title
      taskNumber.textContent = app.displayTaskNumber();
    } else {
      taskElement.firstChild.checked = "";
      app.count += 1;
      // Actualize number of task in title
      taskNumber.textContent = app.displayTaskNumber();
    }
    //console.log(app.tasks);
  },

  displayTaskNumber: () => app.count,

  bindTaskListeners: task => {
    task.addEventListener("click", app.handleCompleteTask);
  }
};

// Load App
app.init();
