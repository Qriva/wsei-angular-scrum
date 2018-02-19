import { Action, ActionCreator } from 'redux';
import { uuid } from '../utils/uuid';
import { Sprint } from '../sprint/sprint.model';
import { Task } from '../task/task.model';
import { TaskColumn } from '../../components/task-card/task-card.component';
  
export const CREATE_SPRINT = 'CREATE.SPRINT';
export const ADD_TASK_TO_SPRINT = 'ADD.TASK.TO.SPRINT';
export const REMOVE_TASK_FROM_TODO = 'REMOVE.TASK.FROM.TODO';
export const MOVE_TASK = 'MOVE.TASK';
export const CLOSE_SPRINT = 'CLOSE.SPRINT';

export interface CreateSprintAction extends Action {
    sprint: Sprint;
}

export const createSprint: ActionCreator<CreateSprintAction> = (sprint) => ({
      type: CREATE_SPRINT,
      sprint: sprint
});
  
export interface AddTaskToSprintAction extends Action {
    task: Task;
}

export const addTaskToSprint: ActionCreator<AddTaskToSprintAction> = (task) => ({
    type: ADD_TASK_TO_SPRINT,
    task: task
});

export interface RemoveTaskFromTODOAction extends Action {
    task: Task;
}

export const removeTaskFromTODO: ActionCreator<RemoveTaskFromTODOAction> = (task) => ({
    type: REMOVE_TASK_FROM_TODO,
    task: task
});

export interface MoveTaskction extends Action {
    task: Task;
    from: TaskColumn;
    to: TaskColumn;
}

export const moveTask: ActionCreator<MoveTaskction> = (task, from, to) => ({
    type: MOVE_TASK,
    task: task,
    from: from,
    to: to
});

export interface CloseSprintAction extends Action {

}

export const closeSprint: ActionCreator<CloseSprintAction> = () => ({
    type: CLOSE_SPRINT
});

