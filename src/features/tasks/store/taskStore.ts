import { create } from "zustand";
import type { Task, TaskFormData, TaskColumn } from "../types/task.types";
import { MOCK_TASKS } from "../mock/tasks.mock";

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  isModalOpen: boolean;
  editingTask: Task | undefined;
  defaultColumn: TaskColumn;

  // Actions
  setSearchQuery: (query: string) => void;
  openCreateModal: (column?: TaskColumn) => void;
  openEditModal: (task: Task) => void;
  closeModal: () => void;
  createTask: (data: TaskFormData) => void;
  updateTask: (taskId: string, data: TaskFormData) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (
    taskId: string,
    sourceColumn: TaskColumn,
    destColumn: TaskColumn,
    sourceIndex: number,
    destIndex: number,
  ) => void;
  getFilteredTasks: () => Task[];
  getTasksByColumn: (column: TaskColumn) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: MOCK_TASKS,
  searchQuery: "",
  isModalOpen: false,
  editingTask: undefined,
  defaultColumn: "backlog",

  setSearchQuery: (query) => set({ searchQuery: query }),

  openCreateModal: (column = "backlog") =>
    set({
      isModalOpen: true,
      editingTask: undefined,
      defaultColumn: column,
    }),

  openEditModal: (task) =>
    set({
      isModalOpen: true,
      editingTask: task,
      defaultColumn: task.column,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingTask: undefined,
    }),

  createTask: (data) => {
    const columnTasks = get().tasks.filter((t) => t.column === data.column);
    const maxOrder =
      columnTasks.length > 0
        ? Math.max(...columnTasks.map((t) => t.order))
        : -1;

    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      order: maxOrder + 1,
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (taskId, data) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...data } : task,
      ),
    }));
  },

  deleteTask: (taskId) => {
    const taskToDelete = get().tasks.find((t) => t.id === taskId);
    if (!taskToDelete) return;

    set((state) => {
      const filteredTasks = state.tasks.filter((t) => t.id !== taskId);
      const updatedTasks = filteredTasks.map((t) => {
        if (t.column === taskToDelete.column && t.order > taskToDelete.order) {
          return { ...t, order: t.order - 1 };
        }
        return t;
      });
      return { tasks: updatedTasks };
    });
  },

  moveTask: (taskId, sourceColumn, destColumn, sourceIndex, destIndex) => {
    set((state) => {
      const taskToMove = state.tasks.find((t) => t.id === taskId);
      if (!taskToMove) return { tasks: state.tasks };

      const newTasks = [...state.tasks];

      if (sourceColumn === destColumn) {
        const columnTasks = newTasks
          .filter((t) => t.column === sourceColumn)
          .sort((a, b) => a.order - b.order);

        const [movedTask] = columnTasks.splice(sourceIndex, 1);
        columnTasks.splice(destIndex, 0, movedTask);

        columnTasks.forEach((task, index) => {
          const taskIndex = newTasks.findIndex((t) => t.id === task.id);
          if (taskIndex !== -1) {
            newTasks[taskIndex] = { ...newTasks[taskIndex], order: index };
          }
        });
      } else {
        const sourceTasks = newTasks
          .filter((t) => t.column === sourceColumn)
          .sort((a, b) => a.order - b.order);
        const destTasks = newTasks
          .filter((t) => t.column === destColumn)
          .sort((a, b) => a.order - b.order);

        const [movedTask] = sourceTasks.splice(sourceIndex, 1);
        destTasks.splice(destIndex, 0, { ...movedTask, column: destColumn });

        sourceTasks.forEach((task, index) => {
          const taskIndex = newTasks.findIndex((t) => t.id === task.id);
          if (taskIndex !== -1) {
            newTasks[taskIndex] = { ...newTasks[taskIndex], order: index };
          }
        });

        destTasks.forEach((task, index) => {
          const taskIndex = newTasks.findIndex((t) => t.id === task.id);
          if (taskIndex !== -1) {
            newTasks[taskIndex] = {
              ...newTasks[taskIndex],
              column: destColumn,
              order: index,
            };
          }
        });
      }

      return { tasks: newTasks };
    });
  },

  getFilteredTasks: () => {
    const { tasks, searchQuery } = get();
    if (!searchQuery.trim()) return tasks;
    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    );
  },

  getTasksByColumn: (column) => {
    return get()
      .getFilteredTasks()
      .filter((task) => task.column === column)
      .sort((a, b) => a.order - b.order);
  },
}));
