import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BacklogComponent } from '../backlog/backlog.component';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppStore } from '../../app.store';
import { AppState } from '../../app.reducer';
import * as Redux from 'redux';
import { editTask } from '../../model/store/backlog.actions';
import { Task } from '../../model/task/task.model';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  private name: AbstractControl;
  private type: AbstractControl;
  private points: AbstractControl;
  private description: AbstractControl;
  private taskForm: FormGroup;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>, public dialogRef: MatDialogRef<BacklogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.taskForm = fb.group({
      'name':  [data.task.name, Validators.required],
      'type':  [data.task.type, Validators.required],
      'description':  [data.task.description],
      'points':  [data.task.points, [Validators.required, Validators.min(0), Validators.max(64)] ],
    });
    this.name = this.taskForm.controls['name'];
    this.type = this.taskForm.controls['type'];
    this.points = this.taskForm.controls['points'];
    this.description = this.taskForm.controls['description'];

    this.taskForm.valueChanges.subscribe( (form: Task) => {
      let name = form.name;
      if(form.name == null || form.name == ""){
        name = this.data.task.name;
      }
      let points = form.points;
      if(!this.points.valid){
        points = this.data.task.points;
      }

      let task: Task = {
        id: this.data.task.id,
        name: name,
        description: form.description,
        type: form.type,
        points: points,
      };
      this.store.dispatch(editTask(task));
    });
  }

  ngOnInit() {
  }

  onSubmit(formVal){

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
