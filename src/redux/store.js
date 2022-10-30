import { configureStore } from '@reduxjs/toolkit';
import foldersSlice from './slices/foldersSlice';
import notesSlice from './slices/notesSlice';
import userSlice from './slices/userSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    folders: foldersSlice,
    notes: notesSlice,
  },
});
