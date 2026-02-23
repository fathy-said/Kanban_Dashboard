import { Box, Chip } from "@mui/material";
import { Typography } from "../atoms/Typography";
import {
  COLUMN_LABELS,
  COLUMN_COLORS,
} from "../../features/tasks/constants/column.constants";
import type { TaskColumn } from "../../features/tasks/types/task.types";

interface ColumnHeaderProps {
  column: TaskColumn;
  count: number;
}

export const ColumnHeader = ({ column, count }: ColumnHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        mb: 2,
        px: 0.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: COLUMN_COLORS[column],
            boxShadow: `0 0 0 3px ${COLUMN_COLORS[column]}20`,
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          {COLUMN_LABELS[column]}
        </Typography>
      </Box>
      <Chip
        label={count}
        size="small"
        sx={{
          height: 24,
          minWidth: 28,
          fontWeight: 600,
          fontSize: "0.75rem",
          backgroundColor: "action.hover",
          color: "text.secondary",
        }}
      />
    </Box>
  );
};
