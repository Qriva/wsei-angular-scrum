import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activeLinkIndex = 0;
  routes = [
    { path: 'backlog',  label: 'Backlog' },
    { path: 'board',    label: 'Board' },
  ];
}
