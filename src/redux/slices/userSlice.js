import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    username: null,
  },
  reducers: {
    onTokenChange(state, action) {
      state.token = action.payload;
    },
    onUsernameChange(state, action) {
      state.username = action.payload;
    },
    onRemoveUser(state) {
      state.username = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { onTokenChange, onUsernameChange, onRemoveUser } = userSlice.actions;
export default userSlice.reducer;
