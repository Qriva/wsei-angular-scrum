import { Action } from 'redux';
import * as TaskActions from './backlog.actions';
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
    ids: string[];
    tasks: Task[];
    currentTaskId?: string;
};

const initialState: BacklogState = {
    ids: [],
    currentTaskId: null,
    tasks: []
};


export const BacklogReducer = function(state: BacklogState = initialState, action: Action): BacklogState {

    switch (action.type) {
        // Adds a new Task
        case TaskActions.CREATE_TASK: {
            const task = (<TaskActions.CreateTaskAction>action).task;

            if (state.ids.includes(task.id)) {
                return state;
            }

            return {
                ids: [ ...state.ids, task.id ],
                currentTaskId: state.currentTaskId,
                tasks: [ ...state.tasks,  task ] 
            };
        }

    // // Adds a new Message to a particular Thread
    // case ThreadActions.ADD_MESSAGE: {
    //   const thread = (<ThreadActions.AddMessageAction>action).thread;
    //   const message = (<ThreadActions.AddMessageAction>action).message;

    //   // special case: if the message being added is in the current thread, then
    //   // mark it as read
    //   const isRead = message.thread.id === state.currentThreadId ?
    //                   true : message.isRead;
    //   const newMessage = Object.assign({}, message, { isRead: isRead });

    //   // grab the old thread from entities
    //   const oldThread = state.entities[thread.id];

    //   // create a new thread which has our newMessage
    //   const newThread = Object.assign({}, oldThread, {
    //     messages: [...oldThread.messages, newMessage]
    //   });

    //   return {
    //     ids: state.ids, // unchanged
    //     currentThreadId: state.currentThreadId, // unchanged
    //     entities: Object.assign({}, state.entities, {
    //       [thread.id]: newThread
    //     })
    //   };
    // }

    // // Select a particular thread in the UI
    // case ThreadActions.SELECT_THREAD: {
    //   const thread = (<ThreadActions.SelectThreadAction>action).thread;
    //   const oldThread = state.entities[thread.id];

    //   // mark the messages as read
    //   const newMessages = oldThread.messages.map(
    //     (message) => Object.assign({}, message, { isRead: true }));

    //   // give them to this new thread
    //   const newThread = Object.assign({}, oldThread, {
    //     messages: newMessages
    //   });

    //   return {
    //     ids: state.ids,
    //     currentThreadId: thread.id,
    //     entities: Object.assign({}, state.entities, {
    //       [thread.id]: newThread
    //     })
    //   };
    // }

        default:
            return state;
    }
};