import { Box, IconButton, CardContent } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "../atoms/Card";
import { Typography } from "../atoms/Typography";
import type { Task } from "../../features/tasks/types/task.types";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard = ({ task, index, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 1.5,
            cursor: snapshot.isDragging ? "grabbing" : "grab",
            position: "relative",
            overflow: "visible",
            border: "1px solid",
            borderColor: snapshot.isDragging ? "primary.main" : "transparent",
            boxShadow: snapshot.isDragging ? 4 : undefined,
            transform: snapshot.isDragging ? "rotate(2deg)" : undefined,
            transition: "all 0.2s ease-in-out",
            opacity: snapshot.isDragging ? 0.9 : 1,
            "&:hover": {
              borderColor: "primary.light",
              transform: snapshot.isDragging
                ? "rotate(2deg)"
                : "translateY(-2px)",
            },
          }}
          style={provided.draggableProps.style}
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
      )}
    </Draggable>
  );
};
