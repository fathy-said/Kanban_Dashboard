import { Box } from '@mui/material';
import { TaskColumn } from './TaskColumn';
import type { Task, TaskColumn as TaskColumnType } from '../../features/tasks/types/task.types';

interface KanbanBoardProps {
  tasks: Task[];
  onAddTask: (column: TaskColumnType) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const COLUMNS: TaskColumnType[] = ['backlog', 'in_progress', 'review', 'done'];

export const KanbanBoard = ({ tasks, onAddTask, onEditTask, onDeleteTask }: KanbanBoardProps) => {
  const getTasksByColumn = (column: TaskColumnType) => {
    return tasks.filter((task) => task.column === column);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        pb: 2,
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'action.hover',
          borderRadius: 4,
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
  );
};
