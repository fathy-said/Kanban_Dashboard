import type { TaskColumn } from '../types/task.types';

export const COLUMN_LABELS: Record<TaskColumn, string> = {
  backlog: 'Backlog',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

export const COLUMN_COLORS: Record<TaskColumn, string> = {
  backlog: '#9e9e9e',
  in_progress: '#2196f3',
  review: '#ff9800',
  done: '#4caf50',
};
