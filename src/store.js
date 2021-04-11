import { configureStore } from "@reduxjs/toolkit";
import films from "./filmsSlice";
import characters from "./charactersSlice";

export default configureStore({
  reducer: {
    films,
    characters
  }
});
