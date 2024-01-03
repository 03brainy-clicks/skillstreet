import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.unshift(action.payload);
      saveToLocalStorage(state.notes);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveToLocalStorage(state.notes);
    },
    updateNote: (state, action) => {
      const { id } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = action.payload;
        saveToLocalStorage(state.notes);
      }
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
      saveToLocalStorage(state.notes);
    },
  },
});

// Function to save notes to local storage
const saveToLocalStorage = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Function to load notes from local storage
export const loadFromLocalStorage = () => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};

export const { addNote, deleteNote, updateNote, setNotes } = notesSlice.actions;

export const selectNotes = (state) => state.notes.notes;

// Load notes from local storage on Redux store initialization
const savedNotes = loadFromLocalStorage();
initialState.notes = savedNotes;

export default notesSlice.reducer;
