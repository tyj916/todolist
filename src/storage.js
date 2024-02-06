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

    if (!todolistJSON) {
      const housework = Task("Do housework", "There's dust again.", new Date(), "medium");
      const code = Task("Code!!", "Do your coding bro", new Date(), 'high');
      const read = Task("Read book", "Read? Meh I really want to sleep", new Date(), 'low');
      const pullup = Task("Pull up", "Pull up bro!", new Date(), "low");
      const pushup = Task("Push up", "Push up!!!!", new Date(), 'low');

      housework.isCompleted = true;

      const workout = Project("Workout", "Gotta be strong!");
      workout.addTask(pullup);
      workout.addTask(pushup);
      workout.addTask(housework);
      workout.removeTask(housework);

      const study = Project("Study", "Gotta be smart.");
      study.addTask(code);
      study.addTask(read);
      study.addTask(housework);

      todolist.addProject(Project("Default", "Unassigned tasks will be stored here!"));
      todolist.addProject(workout);
      todolist.addProject(study);
    } else {
      todolistJSON.projects.forEach(project => {
        const tempProject = Project(project.title, project.description);

        project.tasks.forEach(task => {
          const tempTask = Task(task.title, task.description, task.dueDate, task.priority);
          tempTask.isCompleted = task.isCompleted;
          tempProject.addTask(tempTask);
        })

        todolist.addProject(tempProject);
      });
    }
    
    return todolist;
  }

  return {
    save,
    load,
  }
}

