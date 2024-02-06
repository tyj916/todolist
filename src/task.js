export function Task(title, description, dueDate, priority) {
  let isCompleted = false;

  function log() {
    console.log(title,description,dueDate,priority,isCompleted);
  }

  return {
    title,
    description,
    dueDate: new Date(dueDate).toISOString().slice(0, 16),
    priority,
    isCompleted,
    log,
  }
}

