import { Action, ActionCreator } from 'redux';
import { uuid } from '../utils/uuid';
import { Task } from '../task/task.model';
  
export const ADD_TASK = 'ADD.TASK';
export const EDIT_TASK = 'EDIT.TASK';
export const REMOVE_TASK_FROM_BACKLOG = 'REMOVE.TASK.FROM.BACKLOG';


export interface AddTaskAction extends Action {
    task: Task;
}

export const addTaskToBacklog: ActionCreator<AddTaskAction> = (task) => ({
    type: ADD_TASK,
    task: task
});

export interface RemoveTaskAction extends Action {
    task: Task;
}

export const removeTask: ActionCreator<RemoveTaskAction> = (task) => ({
    type: REMOVE_TASK_FROM_BACKLOG,
    task: task
});

export interface EditTaskAction extends Action {
    task: Task;
}

export const editTask: ActionCreator<EditTaskAction> = (task) => ({
    type: EDIT_TASK,
    task: task
});
