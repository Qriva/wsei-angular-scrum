import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Task, TaskType } from '../../model/task/task.model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export type TaskColumn = "todo"|"progress"|"done";

/**
 * Component @Output event for moving task
 * 
 * @export
 * @interface MoveTaskEvent
 */
export interface MoveTaskEvent{
  task: Task;
  to: TaskColumn;
}


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;
  @Input() disabledItem: TaskColumn;

  @Output() taskMove: EventEmitter<MoveTaskEvent> = new EventEmitter<MoveTaskEvent>();

  constructor() {
    
  }

  ngOnInit() {
  }

  /**
   * Method called when moving tasks between columns
   * 
   * @param {Task} task 
   * @param {TaskColumn} to 
   * @memberof TaskCardComponent
   */
  moveTask(task: Task, to: TaskColumn){
    this.taskMove.emit({
      task: task,
      to: to
    });
  }

}
