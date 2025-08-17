import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const token = localStorage.getItem('tm_token');
const user = JSON.parse(localStorage.getItem('tm_user') || 'null');

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || { message: 'Login failed' });
  }
});

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || { message: 'Register failed' });
  }
});

export const fetchMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || { message: 'Auth check failed' });
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    user: user || null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('tm_token');
      localStorage.removeItem('tm_user');
    }
  },
  extraReducers: (builder) => {
    const fulfilled = (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('tm_token', action.payload.token);
      localStorage.setItem('tm_user', JSON.stringify(action.payload.user));
    };
    const rejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Something went wrong';
    };

    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(login.fulfilled, fulfilled)
      .addCase(login.rejected, rejected)
      .addCase(register.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(register.fulfilled, fulfilled)
      .addCase(register.rejected, rejected)
      .addCase(fetchMe.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchMe.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload; })
      .addCase(fetchMe.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload?.message || 'Auth failed'; });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
