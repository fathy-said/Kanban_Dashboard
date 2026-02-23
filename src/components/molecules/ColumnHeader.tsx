import { Box } from '@mui/material';
import { Typography } from '../atoms/Typography';
import { COLUMN_LABELS, COLUMN_COLORS } from '../../features/tasks/constants/column.constants';
import type { TaskColumn } from '../../features/tasks/types/task.types';

interface ColumnHeaderProps {
  column: TaskColumn;
  count: number;
}

export const ColumnHeader = ({ column, count }: ColumnHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: COLUMN_COLORS[column],
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {COLUMN_LABELS[column]}
      </Typography>
      <Box
        sx={{
          ml: 'auto',
          backgroundColor: 'action.hover',
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {count}
        </Typography>
      </Box>
    </Box>
  );
};
