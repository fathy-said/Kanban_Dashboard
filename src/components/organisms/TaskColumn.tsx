import { useCallback, useRef, useEffect } from "react";
import { Box, Paper, alpha, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "../molecules/TaskCard";
import { ColumnHeader } from "../molecules/ColumnHeader";
import { Button } from "../atoms/Button";
import {
  useInfiniteTasks,
  useDeleteTask,
} from "../../features/tasks/hooks/useTasks";
import type {
  Task,
  TaskColumn as TaskColumnType,
} from "../../features/tasks/types/task.types";

const TASKS_PER_PAGE = 10;

interface TaskColumnComponentProps {
  column: TaskColumnType;
  search: string;
  onAddTask: (column: TaskColumnType) => void;
  onEditTask: (task: Task) => void;
}

export const TaskColumn = ({
  column,
  search,
  onAddTask,
  onEditTask,
}: TaskColumnComponentProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteTasks({
      column,
      search,
      limit: TASKS_PER_PAGE,
    });

  const deleteTask = useDeleteTask();

  // Flatten all pages into single array; guard against undefined pages/data
  const tasks =
    data?.pages
      .flatMap((page) => page?.data ?? [])
      .filter((task): task is Task => Boolean(task && (task as Task).id)) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      deleteTask.mutate({ id: taskId, column });
    },
    [deleteTask, column],
  );

  // Intersection Observer callback to auto-load more tasks
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  // Setup Intersection Observer
  const setLoadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      });

      if (node) observerRef.current.observe(node);
      loadMoreRef.current = node;
    },
    [handleObserver],
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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
            maxHeight: 600,
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
          <ColumnHeader column={column} count={total} />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "calc(100vh - 320px)",
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
            {isLoading && tasks.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
                Loading...
              </Box>
            ) : (
              tasks.map((task: Task, index: number) => (
                <TaskCard
                  key={String(task.id)}
                  task={task}
                  index={index}
                  onEdit={onEditTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
            {provided.placeholder}

            {/* Auto-load trigger - loads more when scrolled into view */}
            {(hasNextPage || isFetchingNextPage) && (
              <Box
                ref={setLoadMoreRef}
                sx={{
                  py: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isFetchingNextPage && (
                  <CircularProgress size={24} color="primary" />
                )}
              </Box>
            )}
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
