import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Task, TaskType } from '../../model/task/task.model';
import { uuid } from '../../model/utils/uuid';
import { AppStore } from '../../app.store';
import * as Redux from 'redux';
import { AppState } from '../../app.reducer';
import { REMOVE_TASK_FROM_BACKLOG, ADD_TASK, addTaskToBacklog } from '../../model/store/backlog.actions';
import { Sprint } from '../../model/sprint/sprint.model';
import { CREATE_SPRINT, addTaskToSprint, ADD_TASK_TO_SPRINT, removeTaskFromTODO } from '../../model/store/sprint.actions';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewSprintDialogComponent } from '../new-sprint-dialog/new-sprint-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  private newTaskTitle: string = "";
  private newTaskType: TaskType = 'task';
  private currentSprint: Sprint;
  private backlogTasks: Array<Task>;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>, public dialog: MatDialog) {
    // Listen for store changes and update variables
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  ngOnInit() {
  }

  updateState() {
    const state = this.store.getState();
    // Store the task list
    this.currentSprint = state.sprint.current;
    // Store backlog tasks
    this.backlogTasks = state.backlog.tasks;
  }

  // Open dialog for Spring creation
  openSprintCreateDialog(): void {
    // Open dialog
    let dialogRef = this.dialog.open(NewSprintDialogComponent, {
      width: '250px',
      data: {}
    });

    // Create Sprint when closed
    dialogRef.afterClosed().subscribe(result => {
      // Skip if no data
      if(!result){
        return;
      }
      this.createSprint(
        result.name, 
        result.start, 
        result.end
      );
    });
  }
  

  onTaskFormSubmit(form: NgForm) {
    // Check if form is valid
    if(!form.valid){
      return;
    }
    // Check if name is not empty
    if(form.value['task-title'] == ""){
      return;
    }
    // Create task if all ok
    this.createTask(form.value['task-title'], form.value['task-type']);
    
    // Clear input after adding
    this.newTaskTitle = "";
  }

  moveTaskToSprint(task: Task){
    // Add task to Sprint
    this.store.dispatch( addTaskToSprint(task) );
    // And remove from Backlog
    this.store.dispatch({
      type: REMOVE_TASK_FROM_BACKLOG,
      task: task
    });
  }

  moveTaskToBacklog(task){
    // Add task to Backlog
    this.store.dispatch( addTaskToBacklog(task) );
    // And remove from Sprint TODO list
    this.store.dispatch( removeTaskFromTODO(task) );
  }

  createTask(name: string, type: TaskType) {
    // New Task object
    let newTask: Task = {
      id: uuid(),
      name: name,
      description: "",
      type: type,
      points: 1
    };
    // Adding to store
    this.store.dispatch({
      type: ADD_TASK,
      task: newTask
    });
  }

  openTaskDetailsDialog(task: Task){
    // Open dialog
    let dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '400px',
      data: {task: task}
    });

    // Create Sprint when closed
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  createSprint(name: string, startDate: Date, endDate: Date) {
    let sprint: Sprint = {
      id: uuid(),
      name: name,
      start: startDate,
      end: endDate,
      todo: [],
      progress: [],
      done: []
    };
    // Adding Sprint to store
    this.store.dispatch({
      type: CREATE_SPRINT,
      sprint: sprint
    });
  }

  getBacklogTasks(){
    return this.backlogTasks;
  }

  getCurrentSprint(){
    return this.currentSprint;
  }

  // Sum points of TODO list
  sumSprintTODOPoints(){
    let total = 0;
    for (let i = 0; i < this.currentSprint.todo.length; i++) {
      total += this.currentSprint.todo[i].points; 
    }
    return total;
  }

}
