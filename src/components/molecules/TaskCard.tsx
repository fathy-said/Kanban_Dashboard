import { Box, IconButton, CardContent } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Card } from "../atoms/Card";
import { Typography } from "../atoms/Typography";
import type { Task } from "../../features/tasks/types/task.types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Card
      sx={{
        mb: 1.5,
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
        border: "1px solid",
        borderColor: "transparent",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.light",
          transform: "translateY(-2px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
        >
          <Typography
            variant="subtitle2"
            sx={{
              flex: 1,
              fontWeight: 600,
              color: "text.primary",
              lineHeight: 1.4,
            }}
          >
            {task.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              opacity: 0,
              transition: "opacity 0.15s ease-in-out",
              ".MuiCard-root:hover &": {
                opacity: 1,
              },
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "primary.light",
                },
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "error.main",
                  backgroundColor: "error.light",
                },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
