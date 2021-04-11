import { configureStore } from "@reduxjs/toolkit";
import films from "../features/films/filmsSlice";
import characters from "../features/characters/charactersSlice";

export default configureStore({
  reducer: {
    films,
    characters
  }
});
