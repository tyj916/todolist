import { LocalStorage } from "./storage";

export function UIController() {
  // cache DOM
  const body = document.querySelector("body");

  const sidebar = body.querySelector("#sidebar");
  const homeBtn = sidebar.querySelector("#home");
  const projectsContainer = sidebar.querySelector("#projects .container");
  const addProjectBtn = sidebar.querySelector("#add-project");

  const content = body.querySelector("#content");

  // bind events
  homeBtn.addEventListener("click", ()=>{});
  addProjectBtn.addEventListener("click", ()=>{});

  function clearSidebarProjects() {
    projectsContainer.textContent = '';
  }

  function clearContent() {
    content.textContent = '';
  }

  function renderSidebarProjects(projects) {
    projects.forEach(project => {
      const title = document.createElement('button');
      title.classList.add('project', 'title');
      title.textContent = project.title;
      
      projectsContainer.appendChild(title);
    });
  }

  function renderProject(project) {
    const container = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const tasksContainer = document.createElement("div");
    const addTaskBtn = document.createElement("button");

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(addTaskBtn);
    container.appendChild(tasksContainer);
    content.appendChild(container);

    container.classList.add("content", "container");
    title.classList.add("content", "title");
    description.classList.add("content", "description");
    tasksContainer.id = "tasks-container";
    addTaskBtn.id = "add-task";

    title.textContent = project.title;
    description.textContent = project.description;
    addTaskBtn.textContent = "+ New Task";

    project.tasks.forEach(renderTask);
  }

  function renderTask(task) {
    const tasksContainer = content.querySelector("#tasks-container");

    const container = document.createElement("div");
    const title = document.createElement("h3");
    const dueDate = document.createElement("p");
    const completeBtn = document.createElement("button");
    const detailsBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    container.appendChild(completeBtn);
    container.appendChild(title);
    container.appendChild(dueDate);
    container.appendChild(detailsBtn);
    container.appendChild(removeBtn);
    tasksContainer.appendChild(container);
    
    container.classList.add("task", "container");
    title.classList.add("task", "title");
    dueDate.classList.add("task", "due-date");

    container.dataset.priority = task.priority;

    title.textContent = task.title;
    dueDate.textContent = task.dueDate;
    completeBtn.textContent = "✓";
    detailsBtn.textContent = "Details";
    removeBtn.textContent = "❌";
  }

  return {
    clearSidebarProjects,
    clearContent,
    renderSidebarProjects,
    renderProject,
  }
}