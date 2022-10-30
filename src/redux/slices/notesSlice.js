import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { headers } from './foldersSlice';

// "title": "string",
//   "content": "string",
//   "color": "White"

export const deleteNote = createAsyncThunk(
  'notes/deleteNotes',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://test-api.misaka.net.ru/api/Notes/${id}`, {
        headers: headers(token),
      });
      return response;
    } catch (error) {
      rejectWithValue();
    }
  },
);

export const editNote = createAsyncThunk(
  'notes/editNotes',
  async ({ token, title, content, id }, { rejectWithValue }) => {
    try {
      const data = {
        title,
        content,
      };
      const response = await axios.put(`https://test-api.misaka.net.ru/api/Notes/${id}`, data, {
        headers: headers(token),
      });
      return response.data;
    } catch (error) {
      rejectWithValue();
    }
  },
);

export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://test-api.misaka.net.ru/api/Folders/${id}/notes`, {
        headers: headers(token),
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue();
    }
  },
);

export const noteCreate = createAsyncThunk(
  'notes/noteCreate',
  async ({ title, content, color, token, id }, { rejectWithValue }) => {
    try {
      const data = {
        title,
        content,
        color,
      };
      const response = await axios.post(
        `https://test-api.misaka.net.ru/api/Folders/${id}/notes`,
        data,
        { headers: headers(token) },
      );
      console.log(response);
      return response.data;
    } catch (error) {
      rejectWithValue();
    }
  },
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: null,
    newNote: false,
    status: null,
    update: null,
    id: null,
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    onNewNoteShow(state) {
      state.newNote = true;
    },
    onNewNoteClose(state) {
      state.newNote = false;
    },
    onNoteCreate(state, action) {
      state.notes = action.payload;
      state.status = null;
      state.update = null;
      state.newNote = false;
    },
  },
  extraReducers: {
    [noteCreate.fulfilled]: (state, action) => {
      state.notes = action.payload;
      state.status = null;
      state.update = null;
      state.newNote = false;
    },
    [noteCreate.pending]: (state) => {
      state.status = 'loading';
      state.update = true;
    },
    [noteCreate.rejected]: (state) => {
      state.status = 'error';
    },
    [getNotes.fulfilled]: (state, action) => {
      state.status = null;
      state.notes = action.payload;
    },
    [getNotes.pending]: (state) => {
      state.status = 'loading';
    },
    [getNotes.rejected]: (state) => {
      state.status = 'error';
    },
    [editNote.fulfilled]: (state) => {
      state.status = null;
      state.update = null;
    },
    [editNote.pending]: (state) => {
      state.status = 'loading';
      state.update = true;
    },
    [editNote.rejected]: (state) => {
      state.status = 'error';
    },
    [deleteNote.fulfilled]: (state) => {
      state.status = null;
      state.update = null;
    },
    [deleteNote.pending]: (state) => {
      state.status = 'loading';
      state.update = true;
    },
    [deleteNote.rejected]: (state) => {
      state.status = 'error';
    },
  },
});

export const { onNewNoteClose, onNewNoteShow, onNoteCreate, setId } = notesSlice.actions;
export default notesSlice.reducer;
