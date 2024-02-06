export function Task(title, description, dueDate, priority) {
  const isCompleted = false;

  function toggleComplete() {
    isCompleted = isCompleted ? false : true;
  }

  function log() {
    console.log(title,description,dueDate,priority,isCompleted);
  }

  return {
    title,
    description,
    dueDate: new Date(dueDate).toISOString().slice(0, 16),
    priority,
    isCompleted,
    toggleComplete,
    log,
  }
}

