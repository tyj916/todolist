import 'normalize.css';
import { Task } from './task';
import { Project } from './project';
import { Todolist } from './todolist';
import { render } from './render';

// const houseworkTask = Task("Do housework", "There's dust again.", new Date(), "medium");
// const workoutTask = Task("Workout", "", new Date(), "low");

// const workoutProject = Project("Workout", "");
// workoutProject.addTask(houseworkTask);
// workoutProject.addTask(houseworkTask);
// workoutProject.addTask(workoutTask);

// workoutProject.removeTask(houseworkTask);

// const todolist = Todolist();
// todolist.addProject(workoutProject);
// todolist.removeTask(houseworkTask);

// const storage = LocalStorage();
// const todolist = storage.load();
// storage.save(todolist);

// todolist.log();

render();