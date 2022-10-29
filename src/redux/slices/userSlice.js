import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const updateHeaders = {
  accept: 'text/plain',
  'Content-Type': 'application/json',
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://test-api.misaka.net.ru/api/Account/register', {
        username: username,
        email: email,
        password: password,
      });

      return [response.data, username];
    } catch (error) {
      rejectWithValue();
    }
  },
);

export const authUser = createAsyncThunk(
  'user/authUser',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://test-api.misaka.net.ru/api/Account/login', {
        username: login,
        password: password,
      });

      return [response.data, login];
    } catch (error) {
      return rejectWithValue();
    }
  },
);

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://test-api.misaka.net.ru/api/Account/refresh-token',
        {
          headers: updateHeaders,
          refreshToken: refreshToken,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue();
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    refreshToken: null,
    username: null,
    status: null,
  },
  reducers: {
    onTokenChange(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    onUsernameChange(state, action) {
      state.username = action.payload;
    },
    onRemoveUser(state) {
      state.username = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
    },
  },
  extraReducers: {
    [authUser.fulfilled]: (state, action) => {
      state.token = action.payload[0].accessToken;
      state.refreshToken = action.payload[0].refreshToken;
      state.username = action.payload[1];
      localStorage.setItem('token', state.token);
      localStorage.setItem('refreshToken', state.refreshToken);
      localStorage.setItem('username', state.username);
      state.status = 'finished';
      state.errors = null;
    },
    [authUser.pending]: (state) => {
      state.status = 'loading';
      state.errors = null;
    },
    [authUser.rejected]: (state) => {
      state.status = 'error';
    },
    [updateToken.fulfilled]: (state, action) => {
      const token = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      onTokenChange(token, refreshToken);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    },
    [updateToken.rejected]: (state) => {
      state.username = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
    },
    [createUser.fulfilled]: (state, action) => {
      state.username = action.payload[1];
      state.token = action.payload[0].accessToken;
      state.refreshToken = action.payload[0].refreshToken;
      localStorage.setItem('token', state.token);
      localStorage.setItem('refreshToken', state.refreshToken);
      localStorage.setItem('username', state.username);
    },
  },
});

export const { onTokenChange, onUsernameChange, onRemoveUser } = userSlice.actions;
export default userSlice.reducer;
