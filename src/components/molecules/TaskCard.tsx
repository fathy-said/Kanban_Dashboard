import { Box, IconButton, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card } from '../atoms/Card';
import { Typography } from '../atoms/Typography';
import type { Task } from '../../features/tasks/types/task.types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" sx={{ flex: 1, mr: 1 }}>
            {task.title}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(task)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(task.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
