import { Task } from "../task/task.model";

export interface Sprint {
    id: string;
    name: string;
    start: Date;
    end: Date;
    todo: Array<Task>;
    progress: Array<Task>;
    done: Array<Task>;
}
