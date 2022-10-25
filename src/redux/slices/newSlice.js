import { createSlice } from "@reduxjs/toolkit";

const newSlice = createSlice({
	name: 'new',
	initialState: {
		newFolder: null,
		newNote: null
	},
	reducers: {
		onNewFolder(state) {
			state.newFolder = true;
		},
		onNewNote(state) {
			state.newNote = true;
		},
		onCloseAll(state) {
			state.newFolder = null;
			state.newNote = null;
		}
	}
});

export const {onNewFolder, onNewNote, onCloseAll} = newSlice.actions;
export default newSlice.reducer;