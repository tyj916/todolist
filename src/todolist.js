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

  function addProject(project) {
    projects.push(project);
  }

  function removeProject(project) {
    const taskIndex = projects.findIndex(() => project);
    projects.splice(taskIndex, 1);
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
    addProject,
    removeProject,
    removeTask,
    log,
  }
}