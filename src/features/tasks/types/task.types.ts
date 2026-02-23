export type TaskColumn = 'backlog' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  column: TaskColumn;
}

export interface TaskFormData {
  title: string;
  description: string;
  column: TaskColumn;
}
