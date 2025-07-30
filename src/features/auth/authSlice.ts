import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:3010/users';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string, password: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API}/login`, payload);
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.msg || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: { username: string, email: string, password: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API}/register`, payload);
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.msg || "Register failed");
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    error: null as null | string,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state, action: any) => { state.error = action.payload; }
      );
  }
});
export const { logout } = slice.actions;
export default slice.reducer;
