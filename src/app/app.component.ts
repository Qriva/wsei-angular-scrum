import { Component, Inject } from '@angular/core';
import { LocalSaveService } from './services/local-save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WSEI Scrum';
  activeLinkIndex = 0;
  routes = [
    { path: 'backlog',  label: 'Backlog' },
    { path: 'board',    label: 'Board' },
  ];

  constructor (@Inject(LocalSaveService) private localSaveService: LocalSaveService) {
    localSaveService.init();
  }

}
