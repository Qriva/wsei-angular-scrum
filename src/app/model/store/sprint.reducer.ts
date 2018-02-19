import { Action } from 'redux';

import * as SprintActions from './sprint.actions';
import { Sprint } from '../sprint/sprint.model';

/**
 * This file describes the state concerning Threads, how to modify them through
 * the reducer, and how to query the state via selectors.
 *
 * ThreadsState stores the list of Threads indexed by id in `entities`, as well
 * as a complete list of the ids in `ids`.
 *
 * We also store the id of the current thread so that we know what the user is
 * currently looking at - this is valuable for the unread messages count, for
 * instance.
 *
 * In this app, we store the Messages in their respective Thread and we don't
 * store the Messages apart from that Thread. In your app you may find it useful
 * to separate Messages into their own Messages reducer and keep only a list
 * of Message ids in your Threads.
 */

export interface SprintState {
    current: Sprint;
};

const initialState: SprintState = {
    current: null
};


export const SprintReducer = function(state: SprintState = initialState, action: Action): SprintState {

    switch (action.type) {
        // Create new sprint
        case SprintActions.CREATE_SPRINT: {
            const sprint = (<SprintActions.CreateSprintAction>action).sprint;

            if (state.current) {
                return state;
            }

            return {
                current: sprint
            };
        }

        case SprintActions.ADD_TASK_TO_SPRINT: {
            const task = (<SprintActions.AddTaskToSprintAction>action).task;
            
            // Skip if sprint does not exist
            if (!state.current) {
                return state;
            }
            // Skip if task with id exists already
            if (state.current.todo.filter(e => e.id === task.id).length > 0) {
                return;
            }

            return {
                current: Object.assign({}, state.current, {
                    todo: [ ...state.current.todo, task ]
                })
            };
        }

        case SprintActions.REMOVE_TASK_FROM_TODO: {
            const task = (<SprintActions.AddTaskToSprintAction>action).task;
            
            // Skip if sprint does not exist
            if (!state.current) {
                return state;
            }

            let taskIndex = state.current.todo.map(function(x) { return x.id; }).indexOf(task.id);

            // Skip if task with id does not exists
            if (taskIndex === -1) {
                return;
            }

            return {
                current: Object.assign({}, state.current, {
                    todo: [ ...state.current.todo.slice(0, taskIndex), ...state.current.todo.slice(taskIndex + 1) ]
                })
            };
        }

        default:
            return state;
    }
};