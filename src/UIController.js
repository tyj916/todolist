import { LocalStorage } from "./storage";
import { Project } from "./project";
import { Task } from "./task";

export function UIController() {
  const storage = LocalStorage();

  // cache DOM
  const body = document.querySelector("body");

  const sidebar = body.querySelector("#sidebar");
  const homeBtn = sidebar.querySelector("#home");
  const projectsContainer = sidebar.querySelector("#projects .container");
  const addProjectBtn = sidebar.querySelector("#add-project");

  const content = body.querySelector("#content");

  const projectDialog = body.querySelector("dialog#project");
  const taskDialog = body.querySelector("dialog#task");

  // bind events
  homeBtn.addEventListener("click", renderHome);
  addProjectBtn.addEventListener("click", showAddProjectDialog);

  function clearSidebarProjects() {
    projectsContainer.textContent = '';
  }

  function clearContent() {
    content.textContent = '';
  }

  function renderSidebarProjects() {
    clearSidebarProjects();

    const todolist = storage.load();

    todolist.projects.forEach(project => {
      const title = document.createElement('button');
      title.classList.add('project', 'title');
      title.textContent = project.title;
      title.addEventListener('click', () => renderProject(project));
      
      projectsContainer.appendChild(title);
    });
  }

  function renderHome() {
    const todolist = storage.load();

    const allTasks = todolist.getAllTasks();
    const home = Project("All Tasks", "Hi, how are you today.");
    allTasks.forEach(task => {
      home.addTask(task);
    });

    renderProject(home);
  }

  function renderProject(project) {
    if (!project) {
      renderHome();
      return;
    }

    clearContent();

    const container = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const tasksContainer = document.createElement("div");
    const addTaskBtn = document.createElement("button");

    addTaskBtn.addEventListener("click", showAddTaskDialog);

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

    project.tasks.forEach(task => renderTask(task, project));

    renderSidebarProjects();
  }

  function renderTask(task) {
    const tasksContainer = content.querySelector("#tasks-container");

    const container = document.createElement("div");
    const title = document.createElement("h3");
    const dueDate = document.createElement("p");
    const completeBtn = document.createElement("button");
    const detailsBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    removeBtn.addEventListener('click', () => removeTask(task));

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

  function showAddProjectDialog() {
    const dialogTitle = projectDialog.querySelector("h2");
    const submitBtn = projectDialog.querySelector("#submit");

    dialogTitle.textContent = "New Project";

    submitBtn.addEventListener('click', addNewProject);

    projectDialog.showModal();
  }

  function addNewProject() {
    const titleElement = projectDialog.querySelector("#title");
    const descriptionElement = projectDialog.querySelector("#description");

    const title = titleElement.value;
    const description = descriptionElement.value;

    const newProject = Project(title, description);

    const todolist = storage.load();
    todolist.addProject(newProject);
    storage.save(todolist);
    renderSidebarProjects();

    titleElement.value = '';
    descriptionElement.value = '';

    projectDialog.close();
  }

  function showAddTaskDialog() {
    const dialogTitle = taskDialog.querySelector("h2");
    const submitBtn = taskDialog.querySelector("#submit");

    dialogTitle.textContent = "New Task";

    submitBtn.addEventListener('click', addNewTask);

    taskDialog.showModal();
  }

  function addNewTask() {
    const titleElement = taskDialog.querySelector("#title");
    const descriptionElement = taskDialog.querySelector("#description");
    const dueDateElement = taskDialog.querySelector("#due-date");
    const priorityElement = taskDialog.querySelector("#priority");
    const currentProjectTitle = content.querySelector("h2").textContent;

    const title = titleElement.value;
    const description = descriptionElement.value;
    const dueDate = dueDateElement.value;
    const priority = priorityElement.value;

    const newTask = Task(title, description, dueDate, priority);

    const todolist = storage.load();
    const targetProject = todolist.getProjectByTitle(currentProjectTitle) ? todolist.getProjectByTitle(currentProjectTitle) : todolist.projects[0];

    todolist.addTask(newTask, targetProject);
    storage.save(todolist);

    renderProject(todolist.getProjectByTitle(currentProjectTitle));

    titleElement.value = '';
    descriptionElement.value = '';
    dueDateElement.value = '';

    taskDialog.close();
  }

  function removeTask(task) {
    const todolist = storage.load();
    todolist.removeTaskByTitle(task.title);
    storage.save(todolist);

    const currentProjectTitle = content.querySelector("h2").textContent;
    renderProject(todolist.getProjectByTitle(currentProjectTitle));
  }

  return {
    clearSidebarProjects,
    clearContent,
    renderSidebarProjects,
    renderHome,
    renderProject,
  }
}