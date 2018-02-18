import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Task, TaskType } from '../../model/task/task.model';
import { uuid } from '../../model/utils/uuid';
import { AppStore } from '../../app.store';
import * as Redux from 'redux';
import { AppState } from '../../app.reducer';
import { addTask, CREATE_TASK } from '../../model/store/backlog.actions';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  private newTaskTitle: string = "";
  private newTaskType: TaskType = 'task';
  private minDate: Date;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>) {
    this.minDate = new Date();
  }

  ngOnInit() {
  }

  onTaskFormSubmit(form: NgForm) {
    // Check if form is valid
    if(!form.valid){
      return;
    }
    // Create task if all ok
    this.createTask(form.value['task-title'], form.value['task-type']);
    console.log(form)
    // Clear input after adding
    this.newTaskTitle = "";
  }

  createTask(name: string, type: TaskType) {
    // New Task object
    let newTask: Task = {
      id: uuid(),
      name: name,
      description: "",
      type: type,
      points: 0
    };
    // Adding to store
    this.store.dispatch({
      type: CREATE_TASK,
      task: newTask
    });
  }

  getBacklogTasks(){
    return this.store.getState().backlog.tasks;
  }

  sprintCreated(){
    if( this.store.getState().sprint.current === null ){
      return false;
    }
    return true;
  }

}
