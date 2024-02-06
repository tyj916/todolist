import 'normalize.css';
import './style.css'
import { Task } from './task';
import { Project } from './project';
import { Todolist } from './todolist';
import { LocalStorage } from './storage';
import { UIController } from './UIController';

const housework = Task("Do housework", "There's dust again.", new Date(), "medium");
const code = Task("Code!!", "Do your coding bro", new Date(), 'high');
const read = Task("Read book", "Read? Meh I really want to sleep", new Date(), 'low');
const pullup = Task("Pull up", "Pull up bro!", new Date(), "low");
const pushup = Task("Push up", "Push up!!!!", new Date(), 'low');

const workout = Project("Workout", "Gotta be strong!");
workout.addTask(pullup);
workout.addTask(pushup);
workout.addTask(housework);
workout.removeTask(housework);

const study = Project("Study", "Gotta be smart.");
study.addTask(code);
study.addTask(read);
study.addTask(housework);

const todolist = Todolist();
todolist.addProject(Project("Default", "Unassigned tasks will be stored here!"));
todolist.addProject(workout);
todolist.addProject(study);
todolist.removeTask(housework);
const getProject = todolist.getProjectByTitle("Study");
console.log(getProject);

const storage = LocalStorage();
storage.save(todolist);

const UI = UIController();
UI.renderHome();
UI.renderSidebarProjects();