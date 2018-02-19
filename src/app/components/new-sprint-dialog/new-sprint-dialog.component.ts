import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BacklogComponent } from '../backlog/backlog.component';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup } from '@angular/forms/src/model';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-new-sprint-dialog',
  templateUrl: './new-sprint-dialog.component.html',
  styleUrls: ['./new-sprint-dialog.component.css']
})
export class NewSprintDialogComponent implements OnInit {
  
  private minDate: Date;

  constructor(public dialogRef: MatDialogRef<BacklogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.minDate = new Date();
  }

  ngOnInit() {
  }

  onSprintFormSubmit(form: NgForm) {
    // Check if form is valid
    if(!form.valid){
      return;
    }
    let result = {
      name: form.value['sprint-name'], 
      start: form.value['sprint-start-date'], 
      end: form.value['sprint-end-date']
    }
    form.reset();
    // Return form results
    this.dialogRef.close(result);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
