import type { Task } from "../types/task.types";

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Design system architecture",
    description: "Create initial design system with tokens and components",
    column: "done",
    order: 0,
  },
  {
    id: "2",
    title: "Setup React project",
    description: "Initialize Vite project with TypeScript and MUI",
    column: "done",
    order: 1,
  },
  {
    id: "3",
    title: "Create atomic components",
    description: "Build reusable atom components (Button, Input, Card, etc.)",
    column: "in_progress",
    order: 0,
  },
  {
    id: "4",
    title: "Implement task cards",
    description: "Create TaskCard molecule with edit/delete functionality",
    column: "in_progress",
    order: 1,
  },
  {
    id: "5",
    title: "Build Kanban columns",
    description: "Implement TaskColumn organism with scrollable task list",
    column: "review",
    order: 0,
  },
  {
    id: "6",
    title: "Add search functionality",
    description: "Implement local search filtering for tasks",
    column: "review",
    order: 1,
  },
  {
    id: "7",
    title: "Create task modals",
    description: "Build modal for creating and editing tasks",
    column: "backlog",
    order: 0,
  },
  {
    id: "8",
    title: "Add drag and drop",
    description: "Implement drag and drop for task columns",
    column: "backlog",
    order: 1,
  },
  {
    id: "9",
    title: "Connect to API",
    description: "Integrate React Query and backend API",
    column: "backlog",
    order: 2,
  },
  {
    id: "10",
    title: "Write tests",
    description: "Add unit and integration tests for components",
    column: "backlog",
    order: 3,
  },
];
