import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSprintDialogComponent } from './new-sprint-dialog.component';

describe('NewSprintDialogComponent', () => {
  let component: NewSprintDialogComponent;
  let fixture: ComponentFixture<NewSprintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSprintDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSprintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
