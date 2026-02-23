import { useState } from "react";
import { useDebounce } from "react-use";
import { DashboardTemplate } from "../components/templates/DashboardTemplate";
import { KanbanBoard } from "../components/organisms/KanbanBoard";
import { Modal } from "../components/atoms/Modal";
import { TaskForm } from "../components/molecules/TaskForm";
import { useTaskStore } from "../features/tasks/store/taskStore";
import { useCreateTask, useUpdateTask } from "../features/tasks/hooks/useTasks";
import type {
  TaskFormData,
  TaskColumn,
} from "../features/tasks/types/task.types";

const DEBOUNCE_MS = 300;

export const DashboardPage = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const {
    searchQuery,
    isModalOpen,
    editingTask,
    defaultColumn,
    setSearchQuery,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useTaskStore();

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  useDebounce(
    () => {
      setDebouncedSearch(searchQuery);
    },
    DEBOUNCE_MS,
    [searchQuery],
  );

  const handleAddTask = (column: TaskColumn) => {
    openCreateModal(column);
  };

  const handleSubmitTask = (formData: TaskFormData) => {
    console.log("Form submitted:", formData);
    console.log("Editing task:", editingTask);
    if (editingTask) {
      console.log("Updating task...");
      updateTask.mutate({ id: editingTask.id, task: formData });
    } else {
      console.log("Creating task...");
      // Use formData.column if user changed it, otherwise use defaultColumn
      const column = formData.column || defaultColumn;
      createTask.mutate({ ...formData, column });
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
          search={debouncedSearch}
          onAddTask={handleAddTask}
          onEditTask={openEditModal}
        />
      </DashboardTemplate>

      <Modal open={isModalOpen} onClose={closeModal}>
        <TaskForm
          task={editingTask}
          defaultColumn={defaultColumn}
          onSubmit={handleSubmitTask}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};
