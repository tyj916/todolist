import { Todolist } from "./todolist";
import { Project } from "./project";
import { Task } from "./task";

export function LocalStorage() {
  function save(todolist) {
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }

  function load() {
    const todolistJSON = JSON.parse(localStorage.getItem('todolist'));

    const todolist = Todolist();
    todolistJSON.projects.forEach(project => {
      const tempProject = Project(project.title, project.description);

      project.tasks.forEach(task => {
        const tempTask = Task(task.title, task.description, task.dueDate, task.priority);
        tempTask.isCompleted = task.isCompleted;
        tempProject.addTask(tempTask);
      })

      todolist.addProject(tempProject);
    });

    return todolist;
  }

  return {
    save,
    load,
  }
}

