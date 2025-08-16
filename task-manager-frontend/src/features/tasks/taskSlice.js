import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchTasks = createAsyncThunk('tasks/fetch', async (params, thunkAPI) => {
  try {
    const { data } = await api.get('/tasks', { params });
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || { message: 'Fetch failed' });
  }
});

export const createTask = createAsyncThunk('tasks/create', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/tasks', payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || { message: 'Create failed' });
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, values }, thunkAPI) => {
  try {
    const { data } = await api.patch(`/tasks/${id}`, values);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || { message: 'Update failed' });
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || { message: 'Delete failed' });
  }
});

const slice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    page: 1,
    pages: 1,
    limit: 20,
    total: 0,
    status: 'idle',
    error: null,
    filters: { q: '', status: '' }
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.items = a.payload.items;
        s.page = a.payload.page;
        s.pages = a.payload.pages;
        s.limit = a.payload.limit;
        s.total = a.payload.total;
      })
      .addCase(fetchTasks.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload?.message; })
      .addCase(createTask.fulfilled, (s, a) => { s.items.unshift(a.payload); s.total += 1; })
      .addCase(updateTask.fulfilled, (s, a) => {
        const idx = s.items.findIndex((t) => t._id === a.payload._id);
        if (idx >= 0) s.items[idx] = a.payload;
      })
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t._id !== a.payload);
        s.total = Math.max(0, s.total - 1);
      });
  }
});

export const { setFilters } = slice.actions;
export default slice.reducer;
