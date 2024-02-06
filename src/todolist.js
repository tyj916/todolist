export function Todolist() {
  const projects = [];

  function getAllTasks() {
    const allTasks = [];
    projects.forEach(project => {
      project.tasks.forEach(task => {
        allTasks.push(task);
      });
    });
    return allTasks;
  }

  function getProjectByTitle(title) {
    const targetProject = projects.find(project => project.title === title);
    return targetProject ? targetProject : projects[0];
  }

  function addProject(project) {
    projects.push(project);
  }

  function removeProject(project) {
    const taskIndex = projects.findIndex(() => project);
    projects.splice(taskIndex, 1);
  }

  function addTask(task, project) {

  }

  function removeTask(task) {
    projects.forEach(project => {
      if (project.tasks.includes(task)) {
        project.removeTask(task);
      }
    });
  }

  function log() {
    projects.forEach(project => project.log());
  }

  return {
    projects,
    getAllTasks,
    getProjectByTitle,
    addProject,
    removeProject,
    addTask,
    removeTask,
    log,
  }
}