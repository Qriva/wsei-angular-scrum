import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppState } from '../../app.reducer';
import { AppStore } from '../../app.store';
import * as Redux from 'redux';
import { Sprint } from '../../model/sprint/sprint.model';
import { MoveTaskEvent, TaskColumn } from '../task-card/task-card.component';
import { moveTask, closeSprint } from '../../model/store/sprint.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private currentSprint: Sprint;
  private sprintProgress: number;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>, public dialog: MatDialog) {
    // Update component on store change
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  ngOnInit() {
  }

  updateState() {
    const state = this.store.getState();

    // Calculate total points and progress
    if(state.sprint.current){
      let todoPoints = 0;
      for (let i = 0; i < state.sprint.current.todo.length; i++) {
        todoPoints += state.sprint.current.todo[i].points;
      }
      let progressPoints = 0;
      for (let i = 0; i < state.sprint.current.progress.length; i++) {
        progressPoints += state.sprint.current.progress[i].points;
      }
      let donePoints = 0;
      for (let i = 0; i < state.sprint.current.done.length; i++) {
        donePoints += state.sprint.current.done[i].points;
      }
      this.sprintProgress = Math.round(donePoints/(todoPoints + progressPoints + donePoints)*100);
    }else{
      this.sprintProgress = 0;
    }

    // Store the task list
    this.currentSprint = state.sprint.current;
  }

  // Move task
  moveTask(event: MoveTaskEvent, from: TaskColumn){
    // console.log(event, from);
    this.store.dispatch( moveTask(event.task, from, event.to) );
  }

  closeSprint(){
    this.store.dispatch( closeSprint() );
  }

}
