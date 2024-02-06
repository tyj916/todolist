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

  function getProject(target) {
    const targetProject = projects.find(project => project === target);
    return targetProject ? targetProject : projects[0];
  }

  function getProjectByTitle(title) {
    return projects.find(project => project.title === title);
  }

  function addProject(project) {
    projects.push(project);
  }

  function removeProject(project) {
    const taskIndex = projects.indexOf(project);
    projects.splice(taskIndex, 1);
  }

  function addTask(task, project) {
    project.addTask(task);
  }

  function removeTask(target) {
    // if (targetProject) {
    //   targetProject.removeTask(task);
    // } else {
    //   projects.forEach(project => {
    //     if (project.tasks.includes(task)) {
    //       project.removeTask(task);
    //     }
    //   });
    // }

    projects.forEach(project => {
      if (project.tasks.includes(task)) {
        project.removeTask(task);
      }
    });
  }

  function removeTaskByTitle(title) {
    projects.forEach(project => {
      project.tasks.forEach(task => {
        if (task.title === title) project.removeTask(task);
      })
    })
  }

  function log() {
    projects.forEach(project => project.log());
  }

  return {
    projects,
    getAllTasks,
    getProject,
    getProjectByTitle,
    addProject,
    removeProject,
    addTask,
    removeTask,
    removeTaskByTitle,
    log,
  }
}