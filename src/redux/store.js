import { configureStore } from '@reduxjs/toolkit';
import newSlice from './slices/newSlice';
import userSlice from './slices/userSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    new: newSlice
  },
});
