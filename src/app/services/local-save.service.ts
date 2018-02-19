import { Injectable, Inject } from '@angular/core';
import { AppStore } from '../app.store';
import * as Redux from "redux";
import { AppState } from '../app.reducer';

@Injectable()
export class LocalSaveService {

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>) {
    
  }

  init(){
    // Listen for store state change
    this.store.subscribe(() => {
      // Save store in local storage
      localStorage.setItem('backlog-redux-state', JSON.stringify(this.store.getState().backlog));
      localStorage.setItem('sprint-redux-state', JSON.stringify(this.store.getState().sprint));
    })
  }

}
