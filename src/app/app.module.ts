import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatChipsModule, MatIconModule } from "@angular/material";
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { BoardComponent } from './components/board/board.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AppState, default as reducer } from './app.reducer';
import { AppStore, appStoreProviders } from './app.store';
import { NewSprintDialogComponent } from './components/new-sprint-dialog/new-sprint-dialog.component';
import { EditTaskDialogComponent } from './components/edit-task-dialog/edit-task-dialog.component';
import { LocalSaveService } from './services/local-save.service';


export const appRoutes: Routes = [
  { path: 'backlog',  component: BacklogComponent },
  { path: 'board',    component: BoardComponent },
  { path: '',
    redirectTo: '/board',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent,
    BacklogComponent,
    BoardComponent,
    PageNotFoundComponent,
    NewSprintDialogComponent,
    EditTaskDialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule
  ],
  entryComponents: [
    NewSprintDialogComponent,
    EditTaskDialogComponent
  ],
  providers: [appStoreProviders, LocalSaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
