import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slice/NotesSlice";
export const Store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default Store;
