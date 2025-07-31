import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Task } from '../../types';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await fetch('/tasks');
  const data = await res.json();
  return data as Task[];
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id'>) => {
    const res = await fetch('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    return (await res.json()) as Task;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (updatedTask: Task) => {
    const res = await fetch(`/tasks/${updatedTask.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
    });
    return (await res.json()) as Task;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number) => {
    await fetch(`/tasks/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
    error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch tasks. Please try again.';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
