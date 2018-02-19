import { Action } from 'redux';
import * as BacklogActions from './backlog.actions';
import { Task } from '../task/task.model';

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

export interface BacklogState {
    ids: Array<string>;
    tasks: Task[];
    currentTaskId: string;
};

const initialState: BacklogState = {
    ids: [],
    currentTaskId: null,
    tasks: []
};


export const BacklogReducer = function(state: BacklogState = initialState, action: Action): BacklogState {

    switch (action.type) {
        // Adds a new Task

        case BacklogActions.ADD_TASK: {

            const task = (<BacklogActions.AddTaskAction>action).task;

            if (state.ids.includes(task.id)) {
                return state;
            }

            return {
                ids: [ ...state.ids, task.id ],
                currentTaskId: state.currentTaskId,
                tasks: [ ...state.tasks,  task ] 
            };
        }

        case BacklogActions.REMOVE_TASK_FROM_BACKLOG: {
            const task = (<BacklogActions.RemoveTaskAction>action).task;

            let taskIndex = state.ids.indexOf(task.id);
            // Skip if -1 becasue does not exist
            if (taskIndex === -1) {
                return state;
            }
            
            return {
                ids: [ ...state.ids.slice(0, taskIndex), ...state.ids.slice(taskIndex + 1) ],
                currentTaskId: state.currentTaskId,
                tasks: [ ...state.tasks.slice(0, taskIndex), ...state.tasks.slice(taskIndex + 1) ],
            };
        }

        case BacklogActions.EDIT_TASK: {
            const task = (<BacklogActions.EditTaskAction>action).task;

            let taskIndex = state.ids.indexOf(task.id);
            // Skip if -1 becasue does not exist
            if (taskIndex === -1) {
                return state;
            }
            
            return {
                ids: [ ...state.ids ],
                currentTaskId: state.currentTaskId,
                tasks: [ 
                    ...state.tasks.slice(0, taskIndex),
                    task,
                    ...state.tasks.slice(taskIndex + 1) 
                ],
            };
        }

        default:
            return state;
    }
};