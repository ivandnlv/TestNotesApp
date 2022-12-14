import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setId } from './notesSlice';

export const headers = (token) => {
  return {
    accept: 'text/plain',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const getFolders = createAsyncThunk(
  'folders/getFolders',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://test-api.misaka.net.ru/api/Folders', {
        headers: headers(token),
      });
      return response.data;
    } catch (error) {
      rejectWithValue();
    }
  },
);

export const createNewFolder = createAsyncThunk(
  'folders/createNewFolder',
  async ({ folderName, folderColor, token }, { rejectWithValue }) => {
    try {
      const data = {
        name: folderName,
        color: folderColor,
      };
      const response = await axios.post('https://test-api.misaka.net.ru/api/Folders', data, {
        headers: headers(token),
      });

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  },
);

export const deleteFolder = createAsyncThunk(
  'folders/deleteFolder',
  async ({ token, id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://test-api.misaka.net.ru/api/Folders/${id}`, {
        headers: headers(token),
      });
      dispatch(setId(null));
      return response;
    } catch (error) {
      rejectWithValue();
    }
  },
);

const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    newFolder: false,
    folderCreate: false,
    status: null,
    update: null,
  },
  reducers: {
    onNewFolderShow(state) {
      state.newFolder = true;
    },
    onCloseAll(state) {
      state.newFolder = false;
    },
  },
  extraReducers: {
    [createNewFolder.fulfilled]: (state) => {
      state.status = null;
      state.newFolder = false;
      state.update = null;
    },
    [createNewFolder.pending]: (state) => {
      state.status = 'loading';
      state.update = true;
    },
    [createNewFolder.rejected]: (state) => {
      state.status = 'error';
    },
    [deleteFolder.fulfilled]: (state) => {
      state.status = null;
      state.update = null;
    },
    [deleteFolder.pending]: (state) => {
      state.status = 'loading';
      state.update = true;
    },
    [deleteFolder.rejected]: (state) => {
      state.status = 'error';
    },
    [getFolders.fulfilled]: (state, action) => {
      state.status = null;
      state.folders = action.payload;
    },
    [getFolders.pending]: (state) => {
      state.status = 'loading';
    },
    [getFolders.rejected]: (state) => {
      state.status = 'error';
    },
  },
});

export const { onNewFolderShow, onNewNote, onCloseAll } = foldersSlice.actions;
export default foldersSlice.reducer;
