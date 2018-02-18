export type TaskType = 'feature' | 'bug' | 'task' | 'improvement' | 'research';

export interface Task {
    id: string;
    name: string;
    description: string;
    type: TaskType;
    points: number;
}
