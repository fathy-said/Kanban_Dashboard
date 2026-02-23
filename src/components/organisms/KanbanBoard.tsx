import { Box, Container, alpha } from "@mui/material";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { TaskColumn } from "./TaskColumn";
import { useUpdateTask, useTasks } from "../../features/tasks/hooks/useTasks";
import type {
  Task,
  TaskColumn as TaskColumnType,
} from "../../features/tasks/types/task.types";

interface KanbanBoardProps {
  search: string;
  onAddTask: (column: TaskColumnType) => void;
  onEditTask: (task: Task) => void;
}

const COLUMNS: TaskColumnType[] = ["backlog", "in_progress", "review", "done"];

export const KanbanBoard = ({
  search,
  onAddTask,
  onEditTask,
}: KanbanBoardProps) => {
  const updateTask = useUpdateTask();

  // Fetch all tasks for drag-drop order calculation
  const { data: allTasksData } = useTasks({
    limit: 1000,
    search,
  });
  const allTasks = allTasksData?.data ?? [];

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const destColumn = destination.droppableId as TaskColumnType;
    const sourceColumn = source.droppableId as TaskColumnType;

    // Get tasks in destination column sorted by order (handle null/undefined orders)
    const destColumnTasks = allTasks
      .filter((t) => t.column === destColumn && t.id !== draggableId)
      .map((t, idx) => ({ ...t, order: t.order ?? idx }))
      .sort((a, b) => a.order - b.order);

    // Calculate new order based on destination index
    let newOrder: number;
    if (destColumnTasks.length === 0) {
      newOrder = 0;
    } else if (destination.index === 0) {
      // Moving to first position
      newOrder = (destColumnTasks[0]?.order ?? 0) - 1;
    } else if (destination.index >= destColumnTasks.length) {
      // Moving to end
      newOrder =
        (destColumnTasks[destColumnTasks.length - 1]?.order ??
          destColumnTasks.length) + 1;
    } else {
      // Moving to middle - place between prev and next
      const prevTask = destColumnTasks[destination.index - 1];
      const nextTask = destColumnTasks[destination.index];
      newOrder =
        ((prevTask?.order ?? destination.index - 1) +
          (nextTask?.order ?? destination.index)) /
        2;
    }

    updateTask.mutate({
      id: draggableId,
      task: { column: destColumn, order: newOrder },
      sourceColumn,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2.5,
            height: { xs: "auto", lg: "100%" },
            overflowX: { xs: "visible", lg: "auto" },
            overflowY: { xs: "visible", lg: "hidden" },
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
              search={search}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
            />
          ))}
        </Box>
      </Container>
    </DragDropContext>
  );
};
