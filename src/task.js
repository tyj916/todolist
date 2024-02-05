export function Task(title, description, dueDate, priority) {
  const isCompleted = false;

  function log() {
    console.log(title,description,dueDate,priority,isCompleted);
  }

  return {
    title,
    description,
    dueDate,
    priority,
    isCompleted,
    log,
  }
}

