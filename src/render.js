import { LocalStorage } from "./storage";

export function render() {
  const storage = LocalStorage();
  const todolist = storage.load();
  
  // cache DOM
  const body = document.querySelector("body");

  const sidebar = body.querySelector("#sidebar");
  const homeBtn = sidebar.querySelector("#home");
  const addProjectBtn = sidebar.querySelector("#add-project");

  const content = body.querySelector("#content");

  // bind events
  homeBtn.addEventListener("click", ()=>{});
  addProjectBtn.addEventListener("click", ()=>{});
  
  renderProjects(todolist.projects);
  renderHome(todolist);
}

function renderProjects(projects) {
  const sidebar = document.querySelector("#sidebar");
  const projectsContainer = sidebar.querySelector("#projects .container");
  
  projects.forEach(project => {
    const title = document.createElement('button');
    title.classList.add('project', 'title');
    title.textContent = project.title;
    
    projectsContainer.appendChild(title);
  });
}

function renderHome(todolist) {
  const allTasks = todolist.getAllTasks();

  const content = document.querySelector("#content");

  const title = document.createElement("h2");
  const tasksContainer = document.createElement("div");

  title.textContent = "All Tasks";
  tasksContainer.id = "tasks-container";

  allTasks.forEach(task => {
    const taskContainer = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    
    taskContainer.classList.add("task", "container");
    title.classList.add("task", "title");
    description.classList.add("task", "description");
    dueDate.classList.add("task", "due-date");

    title.textContent = task.title;
    description.textContent = task.description;
    dueDate.textContent = task.dueDate;

    taskContainer.appendChild(title);
    taskContainer.appendChild(description);
    taskContainer.appendChild(dueDate);
    tasksContainer.appendChild(taskContainer);
  });

  content.appendChild(title);
  content.appendChild(tasksContainer);
}