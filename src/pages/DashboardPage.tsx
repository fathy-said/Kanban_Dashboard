import { useState, useMemo } from "react";
import { DashboardTemplate } from "../components/templates/DashboardTemplate";
import { KanbanBoard } from "../components/organisms/KanbanBoard";
import { Modal } from "../components/atoms/Modal";
import { TaskForm } from "../components/molecules/TaskForm";
import { MOCK_TASKS } from "../features/tasks/mock/tasks.mock";
import type {
  Task,
  TaskFormData,
  TaskColumn,
} from "../features/tasks/types/task.types";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    );
  }, [tasks, searchQuery]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddTask = (_column: TaskColumn) => {
    // Column parameter is required by KanbanBoard interface for future drag-and-drop implementation
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleSubmitTask = (formData: TaskFormData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task,
        ),
      );
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...formData,
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <>
      <DashboardTemplate
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      >
        <KanbanBoard
          tasks={filteredTasks}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </DashboardTemplate>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};
