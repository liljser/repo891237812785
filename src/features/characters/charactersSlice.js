import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import api from "../../app/api";
import { fetchFilmsByIds } from "../films/filmsSlice";

const entityAdapter = createEntityAdapter();

export const fetchCharactersByIds = createAsyncThunk(
  "characters/fetchCharactersByIds",
  async (ids) => {
    const promises = ids.map((id) => api.getCharacterById(id));
    const payload = await Promise.all(promises);
    return payload;
  }
);

export const fetchCharacterById = createAsyncThunk(
  "characters/fetchCharacterById",
  async (id, { dispatch }) => {
    const payload = await api.getCharacterById(id);
    await dispatch(fetchFilmsByIds(payload.films));
    return payload;
  }
);

const slice = createSlice({
  name: "characters",

  initialState: entityAdapter.getInitialState(),

  extraReducers: {
    [fetchCharacterById.fulfilled]: (state, action) => {
      entityAdapter.addOne(state, action.payload);
    },

    [fetchCharactersByIds.pending]: () => {},

    [fetchCharactersByIds.fulfilled]: (state, action) => {
      entityAdapter.addMany(state, action.payload);
    },

    [fetchCharactersByIds.rejected]: () => {}
  }
});

// SELECTORS

export const {
  selectAll: selectAllCharacters,
  selectById: selectCharacterById
} = entityAdapter.getSelectors((state) => state.characters);

export const selectCharactersByFilm = createSelector(
  [
    selectAllCharacters,
    (state, filmId) => {
      return state.films.entities[filmId];
    }
  ],
  (characters, film) => {
    if (film) {
      return film.characters.reduce((acc, charId) => {
        const char = characters.find((char) => char.id == charId);
        if (char) acc.push(char);
        return acc;
      }, []);
    }
    return [];
  }
);

export default slice.reducer;
