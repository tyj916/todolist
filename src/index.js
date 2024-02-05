import 'normalize.css';
import { LocalStorage } from './storage';

// const houseworkTask = Task("Do housework", "There's dust again.", new Date(), "medium");
// const workoutTask = Task("Workout", "", new Date(), "low");

// const workoutProject = Project("Workout", "");
// workoutProject.addTask(houseworkTask);
// workoutProject.addTask(houseworkTask);
// workoutProject.addTask(workoutTask);

// workoutProject.removeTask(houseworkTask);

// const todolist = Todolist();
// todolist.addProject(workoutProject);
const storage = LocalStorage();
const todolist = storage.load();
storage.save(todolist);
todolist.log();

