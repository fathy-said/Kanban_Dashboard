import type { Task } from '../types/task.types';

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design system architecture',
    description: 'Create initial design system with tokens and components',
    column: 'done',
  },
  {
    id: '2',
    title: 'Setup React project',
    description: 'Initialize Vite project with TypeScript and MUI',
    column: 'done',
  },
  {
    id: '3',
    title: 'Create atomic components',
    description: 'Build reusable atom components (Button, Input, Card, etc.)',
    column: 'in_progress',
  },
  {
    id: '4',
    title: 'Implement task cards',
    description: 'Create TaskCard molecule with edit/delete functionality',
    column: 'in_progress',
  },
  {
    id: '5',
    title: 'Build Kanban columns',
    description: 'Implement TaskColumn organism with scrollable task list',
    column: 'review',
  },
  {
    id: '6',
    title: 'Add search functionality',
    description: 'Implement local search filtering for tasks',
    column: 'review',
  },
  {
    id: '7',
    title: 'Create task modals',
    description: 'Build modal for creating and editing tasks',
    column: 'backlog',
  },
  {
    id: '8',
    title: 'Add drag and drop',
    description: 'Implement drag and drop for task columns',
    column: 'backlog',
  },
  {
    id: '9',
    title: 'Connect to API',
    description: 'Integrate React Query and backend API',
    column: 'backlog',
  },
  {
    id: '10',
    title: 'Write tests',
    description: 'Add unit and integration tests for components',
    column: 'backlog',
  },
];
