import { apiClient } from "../../../lib/axios";
import type { Task, TaskColumn, TaskFormData } from "../types/task.types";

export interface GetTasksParams {
  column?: TaskColumn;
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetTasksResponse {
  data: Task[];
  total: number;
}

interface JsonServerResponse<T> {
  data: T[];
  items: number;
  pages: number;
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
}

export const getTasks = async ({
  column,
  page = 1,
  limit = 10,
  search,
}: GetTasksParams): Promise<GetTasksResponse> => {
  // If searching, fetch all matching tasks then apply pagination client-side
  // This is needed because json-server v1.x has issues with q + column + pagination
  if (search?.trim()) {
    const params: Record<string, string | number> = {
      _sort: "order",
    };
    if (column) {
      params.column = column;
    }

    const response = await apiClient.get<Task[]>("/tasks", { params });
    const allTasks = response.data;

    // Filter by search term (title or description)
    const searchLower = search.trim().toLowerCase();
    const filtered = allTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description?.toLowerCase().includes(searchLower) ?? false),
    );

    // Apply pagination
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      data: paginated,
      total: filtered.length,
    };
  }

  // No search - use server-side pagination
  const params: Record<string, string | number> = {
    _page: page,
    // json-server uses _limit for pagination
    _limit: limit,
    _sort: "order",
  };

  if (column) {
    params.column = column;
  }

  const response = await apiClient.get<JsonServerResponse<Task> | Task[]>(
    "/tasks",
    {
      params,
    },
  );

  // json-server returns an array body with X-Total-Count header
  if (Array.isArray(response.data)) {
    const data = response.data;
    const total = Number(response.headers["x-total-count"]) || data.length;
    return { data, total };
  }

  // Fallback for paginated responses shaped as { data, items }
  return {
    data: response.data.data ?? [],
    total: response.data.items ?? response.data.data?.length ?? 0,
  };
};

export const createTask = async (task: TaskFormData): Promise<Task> => {
  console.log("Creating task with data:", task);
  try {
    // Get existing tasks for this column to calculate the next order
    const params: Record<string, string | number> = {
      column: task.column,
      _sort: "order",
      _per_page: 1000,
    };
    console.log("Fetching existing tasks for column:", task.column);
    const existingResponse = await apiClient.get<JsonServerResponse<Task>>(
      "/tasks",
      {
        params,
      },
    );
    console.log("Raw response:", existingResponse);
    console.log("Response data:", existingResponse.data);
    const existingTasks = existingResponse.data?.data ?? [];
    console.log("Existing tasks:", existingTasks);
    const maxOrder =
      existingTasks.length > 0
        ? Math.max(...existingTasks.map((t) => t.order))
        : -1;

    console.log("Creating task with order:", maxOrder + 1);
    const response = await apiClient.post<Task>("/tasks", {
      ...task,
      id: crypto.randomUUID(),
      order: maxOrder + 1,
    });
    console.log("Task created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

export const updateTask = async (
  id: string,
  task: Partial<TaskFormData>,
): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
