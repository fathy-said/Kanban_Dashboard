import { Box, alpha } from "@mui/material";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { TaskColumn } from "./TaskColumn";
import { useTaskStore } from "../../features/tasks/store/taskStore";
import type {
  Task,
  TaskColumn as TaskColumnType,
} from "../../features/tasks/types/task.types";

interface KanbanBoardProps {
  tasks: Task[];
  onAddTask: (column: TaskColumnType) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const COLUMNS: TaskColumnType[] = ["backlog", "in_progress", "review", "done"];

export const KanbanBoard = ({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanBoardProps) => {
  const moveTask = useTaskStore((state) => state.moveTask);

  const getTasksByColumn = (column: TaskColumnType) => {
    return tasks
      .filter((task) => task.column === column)
      .sort((a, b) => a.order - b.order);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable
    if (!destination) return;

    // Dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move task to new column with proper ordering
    const sourceColumn = source.droppableId as TaskColumnType;
    const destColumn = destination.droppableId as TaskColumnType;
    moveTask(
      draggableId,
      sourceColumn,
      destColumn,
      source.index,
      destination.index,
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: "flex",
          gap: 2.5,
          height: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          pb: 1,
          px: 0.5,
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha("#cbd5e1", 0.5),
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: alpha("#94a3b8", 0.5),
          },
        }}
      >
        {COLUMNS.map((column) => (
          <TaskColumn
            key={column}
            column={column}
            tasks={getTasksByColumn(column)}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};
