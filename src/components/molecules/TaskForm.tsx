import { Box, MenuItem } from '@mui/material';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import type { Task, TaskFormData, TaskColumn } from '../../features/tasks/types/task.types';
import { COLUMN_LABELS } from '../../features/tasks/constants/column.constants';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      column: formData.get('column') as TaskColumn,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {task ? 'Edit Task' : 'Create Task'}
      </Typography>

      <Input
        name="title"
        label="Title"
        defaultValue={task?.title}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <Input
        name="description"
        label="Description"
        defaultValue={task?.description}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <Input
        name="column"
        label="Column"
        defaultValue={task?.column || 'backlog'}
        fullWidth
        required
        select
        sx={{ mb: 3 }}
      >
        {(Object.keys(COLUMN_LABELS) as TaskColumn[]).map((column) => (
          <MenuItem key={column} value={column}>
            {COLUMN_LABELS[column]}
          </MenuItem>
        ))}
      </Input>

      <Box display="flex" gap={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {task ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};
