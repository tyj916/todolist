export function Project(title, description) {
  const tasks = [];

  function addTask(task) {
    tasks.push(task);
  }

  function getTask(task) {
    return tasks.find(() => task);
  }

  function getTaskByTitle(title) {
    tasks.forEach(task => {
      if (task.title === title) return task;
    });
  }
  
  function removeTask(task) {
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
  }

  function log() {
    console.log(title);
    tasks.forEach(task => task.log());
  }

  return {
    title,
    description,
    tasks,
    addTask,
    getTask,
    getTaskByTitle,
    removeTask,
    log,
  }
}

