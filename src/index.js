import 'normalize.css';
import './style.css'
import { Task } from './task';
import { Project } from './project';
import { Todolist } from './todolist';
import { LocalStorage } from './storage';
import { UIController } from './UIController';

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

// storage.save(todolist);

// todolist.log();

const storage = LocalStorage();
const todolist = storage.load();
const allTasks = todolist.getAllTasks();
const allProjects = todolist.projects;
const home = Project("All Tasks", "Hi, how are you today.");
allTasks.forEach(task => {
  home.addTask(task);
});

const UI = UIController();
UI.renderProject(home);
UI.renderSidebarProjects(allProjects);