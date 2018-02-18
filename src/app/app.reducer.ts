/* tslint:disable:typedef */
import { Reducer, combineReducers } from 'redux';

import { BacklogReducer, BacklogState } from './model/store/backlog.reducer';
export * from './model/store/backlog.reducer';

import { SprintReducer, SprintState } from './model/store/sprint.reducer';
export * from './model/store/sprint.reducer';

import { ArchiveReducer, ArchiveState } from './model/store/archive.reducer';
export * from './model/store/archive.reducer';

export interface AppState {
    backlog: BacklogState;
    sprint: SprintState;
    archive: ArchiveState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    backlog: BacklogReducer,
    sprint: SprintReducer,
    archive: ArchiveReducer
});

export default rootReducer;
