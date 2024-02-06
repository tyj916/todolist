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
      title.addEventListener('click', (event) => {
        event.target.parentNode.childNodes.forEach(node => {
          if (node.classList.contains('current')){
            node.classList.remove('current');
          }
        })
        event.target.classList.add('current');
        renderProject(project);
      });
      
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

  function showAddProjectDialog() {
    const dialogTitle = projectDialog.querySelector("h2");
    const submitBtn = projectDialog.querySelector("#submit");

    dialogTitle.textContent = "New Project";

    submitBtn.addEventListener('click', addNewProject);

    projectDialog.showModal();
  }

  function addNewProject() {
    const title = projectDialog.querySelector("#title").value;
    const description = projectDialog.querySelector("#description").value;

    const newProject = Project(title, description);

    const todolist = storage.load();
    todolist.addProject(newProject);
    storage.save(todolist);
    renderSidebarProjects();

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
    const title = taskDialog.querySelector("#title").value;
    const description = taskDialog.querySelector("#description").value;
    const dueDate = taskDialog.querySelector("#due-date").value;
    const priority = taskDialog.querySelector("#priority").value;
    const currentProjectTitle = content.querySelector("h2").textContent;

    const newTask = Task(title, description, dueDate, priority);

    const todolist = storage.load();
    const targetProject = todolist.getProjectByTitle(currentProjectTitle);

    todolist.addTask(newTask, targetProject);
    storage.save(todolist);
    renderProject(targetProject);
    taskDialog.close();
  }

  return {
    clearSidebarProjects,
    clearContent,
    renderSidebarProjects,
    renderHome,
    renderProject,
  }
}