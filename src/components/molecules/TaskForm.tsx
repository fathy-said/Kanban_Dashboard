import { Box, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Typography } from "../atoms/Typography";
import type {
  Task,
  TaskFormData,
  TaskColumn,
} from "../../features/tasks/types/task.types";
import { COLUMN_LABELS } from "../../features/tasks/constants/column.constants";

interface TaskFormProps {
  task?: Task;
  defaultColumn?: TaskColumn;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export const TaskForm = ({
  task,
  defaultColumn = "backlog",
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || "",
    description: task?.description || "",
    column: task?.column || defaultColumn,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange =
    (field: keyof TaskFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {task ? "Edit Task" : "New Task"}
      </Typography>

      <Stack spacing={2.5}>
        <Input
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange("title")}
          fullWidth
          required
          placeholder="Enter task title..."
        />

        <Input
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange("description")}
          fullWidth
          multiline
          rows={4}
          placeholder="Add a description..."
        />

        <Input
          name="column"
          label="Status"
          value={formData.column}
          onChange={handleChange("column")}
          fullWidth
          required
          select
        >
          {(Object.keys(COLUMN_LABELS) as TaskColumn[]).map((column) => (
            <MenuItem key={column} value={column}>
              {COLUMN_LABELS[column]}
            </MenuItem>
          ))}
        </Input>
      </Stack>

      <Box display="flex" gap={1.5} justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={onCancel} sx={{ px: 3 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ px: 4 }}>
          {task ? "Save Changes" : "Create Task"}
        </Button>
      </Box>
    </Box>
  );
};
