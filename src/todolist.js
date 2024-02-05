export function Todolist() {
  const projects = [];

  function addProject(project) {
    projects.push(project);
  }

  function removeProject(project) {
    const taskIndex = projects.findIndex(() => project);
    projects.splice(taskIndex, 1);
  }

  function log() {
    projects.forEach(project => project.log());
  }

  return {
    projects,
    addProject,
    removeProject,
    log
  }
}