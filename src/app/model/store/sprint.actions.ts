import { Action, ActionCreator } from 'redux';
import { uuid } from '../utils/uuid';
import { Sprint } from '../sprint/sprint.model';
import { Task } from '../task/task.model';
  
export const CREATE_SPRINT = 'CREATE.SPRINT';
export const ADD_TASK_TO_SPRINT = 'ADD.TASK.TO.SPRINT';
export const REMOVE_TASK_FROM_TODO = 'REMOVE.TASK.FROM.TODO';


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

//   export const SELECT_THREAD = '[Thread] Select';
//   export interface SelectThreadAction extends Action {
//     thread: Thread;
//   }
//   export const selectThread: ActionCreator<SelectThreadAction> =
//     (thread) => ({
//       type: SELECT_THREAD,
//       thread: thread
//     });
  