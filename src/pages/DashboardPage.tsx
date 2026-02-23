import { DashboardTemplate } from "../components/templates/DashboardTemplate";
import { KanbanBoard } from "../components/organisms/KanbanBoard";
import { Modal } from "../components/atoms/Modal";
import { TaskForm } from "../components/molecules/TaskForm";
import { useTaskStore } from "../features/tasks/store/taskStore";
import type {
  TaskFormData,
  TaskColumn,
} from "../features/tasks/types/task.types";

export const DashboardPage = () => {
  const {
    searchQuery,
    isModalOpen,
    editingTask,
    setSearchQuery,
    openCreateModal,
    openEditModal,
    closeModal,
    createTask,
    updateTask,
    deleteTask,
    getFilteredTasks,
  } = useTaskStore();

  const filteredTasks = getFilteredTasks();

  const handleAddTask = (column: TaskColumn) => {
    openCreateModal(column);
  };

  const handleEditTask = (taskId: string) => {
    const task = filteredTasks.find((t) => t.id === taskId);
    if (task) {
      openEditModal(task);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleSubmitTask = (formData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      createTask(formData);
    }
    closeModal();
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
          onEditTask={(task) => handleEditTask(task.id)}
          onDeleteTask={handleDeleteTask}
        />
      </DashboardTemplate>

      <Modal open={isModalOpen} onClose={closeModal}>
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};
