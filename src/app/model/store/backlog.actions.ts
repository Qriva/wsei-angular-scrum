import { Action, ActionCreator } from 'redux';
import { uuid } from '../utils/uuid';
import { Task } from '../task/task.model';
  
export const CREATE_TASK = 'ADD.TASK';


export interface CreateTaskAction extends Action {
    task: Task;
}

export const addTask: ActionCreator<CreateTaskAction> = (task) => ({
      type: CREATE_TASK,
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
  