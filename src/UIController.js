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
      const container = document.createElement('div');
      const title = document.createElement('button');
      const removeBtn = document.createElement('a');
      
      title.classList.add('project', 'title');
      removeBtn.classList.add('project', 'remove');

      title.textContent = project.title;
      removeBtn.textContent = '❌';

      title.addEventListener('click', () => renderProject(project));
      removeBtn.addEventListener('click', () => removeProject(project));
      
      container.appendChild(title);
      container.appendChild(removeBtn);
      projectsContainer.appendChild(container);
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

    detailsBtn.addEventListener('click', () => editTask(task));
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
    dueDate.textContent = new Date(task.dueDate).toDateString();
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

  function removeProject(project) {
    const todolist = storage.load();
    todolist.removeProject(project);
    storage.save(todolist);

    renderSidebarProjects();

    const currentProjectTitle = content.querySelector("h2").textContent;
    if (currentProjectTitle === project.title) renderHome();
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
    const targetProject = todolist.getProjectByTitle(currentProjectTitle);

    if (targetProject) {
      todolist.addTask(newTask, targetProject);
    } else {
      todolist.addTask(newTask, todolist.projects[0]);
    }
    
    storage.save(todolist);

    renderProject(targetProject);

    titleElement.value = '';
    descriptionElement.value = '';
    dueDateElement.value = '';

    taskDialog.close();
  }

  function editTask(task) {
    const dialogTitle = taskDialog.querySelector("h2");
    const title = taskDialog.querySelector("#title");
    const description = taskDialog.querySelector("#description");
    const dueDate = taskDialog.querySelector("#due-date");
    const priority = taskDialog.querySelector("#priority");
    const submitBtn = taskDialog.querySelector("#submit");

    submitBtn.addEventListener("click", () => updateTask(task));

    dialogTitle.textContent = "Task Details";
    title.value = task.title;
    description.value = task.description;
    dueDate.value = task.dueDate;
    priority.value = task.priority;

    taskDialog.showModal();
  }

  function updateTask(task) {
    const todolist = storage.load();
    const currentProjectTitle = content.querySelector("h2").textContent;
    const targetProject = todolist.getProjectByTitle(currentProjectTitle);

    const targetTask = todolist.getTaskByTitle(task.title, targetProject);

    const title = taskDialog.querySelector("#title");
    const description = taskDialog.querySelector("#description");
    const dueDate = taskDialog.querySelector("#due-date");
    const priority = taskDialog.querySelector("#priority");

    targetTask.title = title.value;
    targetTask.description = description.value;
    targetTask.dueDate = dueDate.value;
    targetTask.priority = priority.value;

    storage.save(todolist);

    title.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = '';

    taskDialog.close();

    renderProject(targetProject);
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