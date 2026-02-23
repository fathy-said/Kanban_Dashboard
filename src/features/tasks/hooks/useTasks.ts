import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  type GetTasksResponse,
} from "../api/tasks.api";
import type { Task, TaskColumn, TaskFormData } from "../types/task.types";

const TASKS_QUERY_KEY = "tasks" as const;

interface UseTasksOptions {
  column?: TaskColumn;
  page?: number;
  search?: string;
  limit?: number;
}

interface UpdateTaskVariables {
  id: string;
  task: Partial<TaskFormData> & { order?: number };
  sourceColumn?: TaskColumn;
}

interface DeleteTaskVariables {
  id: string;
  column: TaskColumn;
}

export const useTasks = ({
  column,
  page = 1,
  search,
  limit = 10,
}: UseTasksOptions) => {
  return useQuery<GetTasksResponse, Error>({
    queryKey: [TASKS_QUERY_KEY, column, page, search],
    queryFn: () =>
      getTasks({
        column,
        page,
        limit,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });
};

interface UseInfiniteTasksOptions {
  column?: TaskColumn;
  search?: string;
  limit?: number;
}

export const useInfiniteTasks = ({
  column,
  search,
  limit = 10,
}: UseInfiniteTasksOptions) => {
  return useInfiniteQuery<GetTasksResponse, Error>({
    queryKey: [TASKS_QUERY_KEY, "infinite", column, search],
    queryFn: ({ pageParam = 1 }) =>
      getTasks({
        column,
        page: pageParam as number,
        limit,
        search,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (acc, page) => acc + page.data.length,
        0,
      );
      return totalLoaded < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, TaskFormData>({
    mutationFn: (task) => createTask(task),
    onError: (error) => {
      console.error("Create task failed:", error);
    },
    onSuccess: async () => {
      // Immediately refetch all task queries for real-time update
      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, UpdateTaskVariables>({
    mutationFn: ({ id, task }) => updateTask(id, task),
    onSuccess: async () => {
      // Immediately refetch all task queries for real-time update
      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteTaskVariables>({
    mutationFn: ({ id }) => deleteTask(id),
    onSuccess: async () => {
      // Immediately refetch all task queries for real-time update
      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
      });
    },
  });
};
