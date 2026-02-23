# Kanban Dashboard

A modern, interactive Kanban board application built with React 19, TypeScript, and Material-UI. This application allows users to manage tasks across different stages of a workflow using drag-and-drop functionality.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![MUI](https://img.shields.io/badge/MUI-7.3.8-purple)
![Vite](https://img.shields.io/badge/Vite-7.3.1-yellow)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Why These Technologies?](#why-these-technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Server](#api-server)
- [Architecture](#architecture)
- [Components](#components)
- [Hooks](#hooks)
- [State Management](#state-management)
- [API Layer](#api-layer)
- [Theming](#theming)

---

## Features

- **Drag and Drop**: Seamlessly move tasks between columns using `@hello-pangea/dnd`
- **4 Task Columns**: Backlog, In Progress, Review, Done
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Real-time Search**: Filter tasks across all columns with debounced search
- **Infinite Scrolling**: Auto-load more tasks as you scroll within columns
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Optimistic Updates**: Instant UI feedback with React Query

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Library |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | 7.3.1 | Build Tool & Dev Server |
| **Material-UI (MUI)** | 7.3.8 | Component Library |
| **@hello-pangea/dnd** | 18.0.1 | Drag and Drop |
| **TanStack React Query** | 5.66.9 | Server State Management |
| **Zustand** | 5.0.11 | Client State Management |
| **Axios** | 1.7.9 | HTTP Client |
| **JSON Server** | 1.0.0-beta.9 | Mock REST API |

---

## Why These Technologies?

### React 19
- Latest React features including improved concurrent rendering
- Better performance and developer experience

### TypeScript
- Provides type safety across the entire codebase
- Better IDE support with autocompletion and error detection
- Self-documenting code through type definitions

### Material-UI (MUI) v7
- Comprehensive, production-ready component library
- Built-in theming system for consistent design
- Accessibility features out of the box
- Highly customizable components

### @hello-pangea/dnd
- Community-maintained fork of react-beautiful-dnd
- Smooth, accessible drag-and-drop interactions
- Built specifically for vertical and horizontal lists
- Excellent React 18/19 compatibility

### TanStack React Query
- Powerful server state management
- Automatic caching and background updates
- Built-in support for infinite queries (pagination)
- Optimistic updates for better UX

### Zustand
- Lightweight client state management (only 1KB)
- Simple API without boilerplate
- Perfect for UI state like modals and search

### Vite
- Lightning-fast HMR (Hot Module Replacement)
- Modern build tool with excellent TypeScript support
- Optimized production builds

---

## Project Structure

```
kanban-dashboard/
├── public/                     # Static assets
├── src/
│   ├── app/                    # App configuration
│   │   └── theme.ts           # MUI theme configuration
│   │
│   ├── assets/                 # Images, fonts, etc.
│   │
│   ├── components/             # UI Components (Atomic Design)
│   │   ├── atoms/             # Basic building blocks
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Typography.tsx
│   │   │
│   │   ├── molecules/         # Combinations of atoms
│   │   │   ├── ColumnHeader.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskForm.tsx
│   │   │
│   │   ├── organisms/         # Complex UI sections
│   │   │   ├── KanbanBoard.tsx
│   │   │   └── TaskColumn.tsx
│   │   │
│   │   └── templates/         # Page layouts
│   │       └── DashboardTemplate.tsx
│   │
│   ├── features/              # Feature-based modules
│   │   └── tasks/
│   │       ├── api/           # API functions
│   │       │   └── tasks.api.ts
│   │       ├── constants/     # Task-related constants
│   │       │   └── column.constants.ts
│   │       ├── hooks/         # Custom React hooks
│   │       │   └── useTasks.ts
│   │       ├── mock/          # Mock data
│   │       │   └── tasks.mock.ts
│   │       ├── store/         # Zustand store
│   │       │   └── taskStore.ts
│   │       └── types/         # TypeScript types
│   │           └── task.types.ts
│   │
│   ├── lib/                   # Library configurations
│   │   ├── axios.ts          # Axios instance
│   │   └── react-query.ts    # React Query client
│   │
│   ├── pages/                 # Page components
│   │   └── DashboardPage.tsx
│   │
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
│
├── db.json                    # JSON Server database
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kanban-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   This command runs both:
   - Frontend: `http://localhost:5173`
   - API Server: `http://localhost:4000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + JSON Server concurrently |
| `npm run dev:frontend` | Start only the Vite dev server |
| `npm run server` | Start only the JSON Server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## API Server

The application uses **JSON Server** as a mock REST API running on `http://localhost:4000`.

### Database Structure (`db.json`)

```json
{
  "tasks": [
    {
      "id": "uuid-string",
      "title": "Task Title",
      "description": "Task description",
      "column": "backlog | in_progress | review | done",
      "order": 0
    }
  ]
}
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks (supports pagination & filtering) |
| `GET` | `/tasks/:id` | Get a single task |
| `POST` | `/tasks` | Create a new task |
| `PATCH` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

### Query Parameters

- `_page` - Page number
- `_per_page` - Items per page
- `_sort` - Sort field (e.g., `order`)
- `column` - Filter by column

---

## Architecture

### Atomic Design Pattern

Components follow the **Atomic Design** methodology:

1. **Atoms**: Smallest, reusable UI elements (`Button`, `Card`, `Typography`)
2. **Molecules**: Groups of atoms (`TaskCard`, `SearchBar`, `TaskForm`)
3. **Organisms**: Complex sections (`KanbanBoard`, `TaskColumn`)
4. **Templates**: Page layouts (`DashboardTemplate`)
5. **Pages**: Complete pages (`DashboardPage`)

### Feature-Based Organization

The `features/` directory contains domain-specific code organized by feature:

```
features/tasks/
├── api/         # API layer
├── constants/   # Feature constants
├── hooks/       # Custom hooks
├── mock/        # Mock data
├── store/       # State management
└── types/       # TypeScript types
```

---

## Components

### Atoms (Basic Building Blocks)

| Component | Description |
|-----------|-------------|
| `Button` | Styled MUI Button wrapper |
| `Card` | Styled MUI Card wrapper |
| `Input` | Styled MUI TextField wrapper |
| `Loader` | Loading spinner component |
| `Modal` | Reusable modal dialog |
| `Typography` | Styled text component |

### Molecules (Composed Components)

| Component | Description |
|-----------|-------------|
| `ColumnHeader` | Header with column title and task count |
| `SearchBar` | Search input with icon |
| `TaskCard` | Draggable task card with edit/delete actions |
| `TaskForm` | Form for creating/editing tasks |

### Organisms (Complex Sections)

| Component | Description |
|-----------|-------------|
| `KanbanBoard` | Main board with drag-drop context and 4 columns |
| `TaskColumn` | Single column with infinite scroll and droppable area |

### Templates (Page Layouts)

| Component | Description |
|-----------|-------------|
| `DashboardTemplate` | Main layout with header, search, and content area |

---

## Hooks

### Custom Hooks (`src/features/tasks/hooks/useTasks.ts`)

| Hook | Description |
|------|-------------|
| `useTasks` | Fetch tasks with pagination, filtering, and search |
| `useInfiniteTasks` | Fetch tasks with infinite scrolling support |
| `useCreateTask` | Create a new task mutation |
| `useUpdateTask` | Update existing task mutation |
| `useDeleteTask` | Delete task mutation |

### Hook Usage Example

```tsx
// Fetch tasks for a specific column with infinite scroll
const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteTasks({
  column: 'backlog',
  search: 'keyword',
  limit: 10,
});

// Create a new task
const createTask = useCreateTask();
createTask.mutate({
  title: 'New Task',
  description: 'Task description',
  column: 'backlog',
});

// Update a task
const updateTask = useUpdateTask();
updateTask.mutate({
  id: 'task-id',
  task: { column: 'in_progress' },
});

// Delete a task
const deleteTask = useDeleteTask();
deleteTask.mutate({ id: 'task-id', column: 'backlog' });
```

---

## State Management

### Server State (React Query)

- **Query Client**: Configured in `src/lib/react-query.ts`
- **Stale Time**: 5 minutes
- **Refetch on Window Focus**: Disabled

### Client State (Zustand)

Located in `src/features/tasks/store/taskStore.ts`

| State | Type | Description |
|-------|------|-------------|
| `tasks` | `Task[]` | All tasks (for local/mock operations) |
| `searchQuery` | `string` | Current search query |
| `isModalOpen` | `boolean` | Modal visibility state |
| `editingTask` | `Task \| undefined` | Task being edited |
| `defaultColumn` | `TaskColumn` | Default column for new tasks |

| Action | Description |
|--------|-------------|
| `setSearchQuery` | Update search query |
| `openCreateModal` | Open modal for new task |
| `openEditModal` | Open modal for editing |
| `closeModal` | Close the modal |
| `moveTask` | Move task between columns (local) |

---

## API Layer

### Axios Configuration (`src/lib/axios.ts`)

```typescript
export const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### API Functions (`src/features/tasks/api/tasks.api.ts`)

| Function | Parameters | Returns |
|----------|------------|---------|
| `getTasks` | `{ column?, page?, limit?, search? }` | `Promise<{ data: Task[], total: number }>` |
| `createTask` | `TaskFormData` | `Promise<Task>` |
| `updateTask` | `id, Partial<TaskFormData>` | `Promise<Task>` |
| `deleteTask` | `id` | `Promise<void>` |

---

## Theming

The application uses a custom MUI theme (`src/app/theme.ts`) with:

### Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| Primary | `#6366f1` | Main actions, highlights |
| Secondary | `#ec4899` | Secondary actions |
| Success | `#10b981` | Done status |
| Warning | `#f59e0b` | Review status |
| Info | `#3b82f6` | In Progress status |
| Error | `#ef4444` | Delete actions |

### Column Colors

| Column | Color | Hex |
|--------|-------|-----|
| Backlog | Grey | `#9e9e9e` |
| In Progress | Blue | `#2196f3` |
| Review | Orange | `#ff9800` |
| Done | Green | `#4caf50` |

### Typography

- **Font Family**: Inter, Roboto, Helvetica, Arial
- **Border Radius**: 12px (rounded corners)
- **Shadows**: Custom subtle shadows for depth

---

## Types

### Task Types (`src/features/tasks/types/task.types.ts`)

```typescript
export type TaskColumn = 'backlog' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  column: TaskColumn;
  order: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  column: TaskColumn;
}
```

---

## License

MIT License

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
