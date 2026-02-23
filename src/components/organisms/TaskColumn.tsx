import { Box, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 280,
        maxWidth: 350,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        borderRadius: 2,
        p: 2,
      }}
    >
      <ColumnHeader column={column} count={tasks.length} />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "calc(100vh - 250px)",
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "action.hover",
            borderRadius: 3,
          },
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </Box>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<AddIcon />}
        onClick={() => onAddTask(column)}
        sx={{
          mt: 2,
          borderStyle: "dashed",
          justifyContent: "flex-start",
        }}
      >
        Add Task
      </Button>
    </Paper>
  );
};
