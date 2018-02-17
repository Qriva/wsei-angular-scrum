import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { BoardComponent } from './components/board/board.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

export const appRoutes: Routes = [
  { path: 'backlog',  component: BacklogComponent },
  { path: 'board',    component: BoardComponent },
  { path: '',
    redirectTo: '/backlog',
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

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
