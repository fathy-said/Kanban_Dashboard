import { Box, Paper, alpha } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "../molecules/TaskCard";
import { ColumnHeader } from "../molecules/ColumnHeader";
import { Button } from "../atoms/Button";
import type {
  Task,
  TaskColumn as TaskColumnType,
} from "../../features/tasks/types/task.types";

interface TaskColumnComponentProps {
  column: TaskColumnType;
  tasks: Task[];
  onAddTask: (column: TaskColumnType) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskColumn = ({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: TaskColumnComponentProps) => {
  return (
    <Droppable droppableId={column}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 300,
            maxWidth: 360,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: snapshot.isDraggingOver
              ? alpha("#6366f1", 0.05)
              : alpha("#f8fafc", 0.6),
            borderRadius: 3,
            p: 2.5,
            border: "1px solid",
            borderColor: snapshot.isDraggingOver ? "primary.light" : "divider",
            transition: "background-color 0.2s ease, border-color 0.2s ease",
          }}
        >
          <ColumnHeader column={column} count={tasks.length} />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "calc(100vh - 280px)",
              mx: -0.5,
              px: 0.5,
              "&::-webkit-scrollbar": {
                width: 4,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: alpha("#cbd5e1", 0.5),
                borderRadius: 2,
              },
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </Box>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => onAddTask(column)}
            sx={{
              mt: 2,
              py: 1,
              borderStyle: "dashed",
              borderWidth: 1.5,
              justifyContent: "center",
              color: "text.secondary",
              borderColor: "divider",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                backgroundColor: alpha("#6366f1", 0.04),
              },
            }}
          >
            Add Task
          </Button>
        </Paper>
      )}
    </Droppable>
  );
};
