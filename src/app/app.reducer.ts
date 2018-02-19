/* tslint:disable:typedef */
import { Reducer, combineReducers } from 'redux';

import { BacklogReducer, BacklogState } from './model/store/backlog.reducer';
export * from './model/store/backlog.reducer';

import { SprintReducer, SprintState } from './model/store/sprint.reducer';
export * from './model/store/sprint.reducer';

/**
 * Application store
 * 
 * @export
 * @interface AppState
 */
export interface AppState {
    backlog: BacklogState;
    sprint: SprintState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    backlog: BacklogReducer,
    sprint: SprintReducer
});

export default rootReducer;
