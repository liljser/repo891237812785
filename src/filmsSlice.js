import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";

import api from "./api";
import { fetchCharactersByIds } from "./charactersSlice";

const entityAdapter = createEntityAdapter();

export const fetchFilms = createAsyncThunk("films/fetchFilms", async () => {
  const payload = await api.getFilms();
  return payload;
});

export const fetchFilmById = createAsyncThunk(
  "films/fetchFilmById",
  async (id, { dispatch }) => {
    const payload = await api.getFilmById(id);

    await dispatch(fetchCharactersByIds(payload.characters));
    // TODO получить остальные списки
    // await dispatch(fetchCharactersByIds(payload.species));
    // await dispatch(fetchCharactersByIds(payload.vehicles));
    // await dispatch(fetchCharactersByIds(payload.planets));

    return payload;
  }
);

export const fetchFilmsByIds = createAsyncThunk(
  "films/fetchFilmsByIds",
  async (ids) => {
    const promises = ids.map((id) => api.getFilmById(id));
    const payload = await Promise.all(promises);
    return payload;
  }
);

const slice = createSlice({
  name: "characters",
  initialState: entityAdapter.getInitialState(),
  extraReducers: {
    [fetchFilms.pending]: (state, action) => {},
    [fetchFilms.fulfilled]: (state, action) => {
      entityAdapter.addMany(state, action.payload);
    },
    [fetchFilms.rejected]: (state, action) => {},
    [fetchFilmById.pending]: (state, action) => {},
    [fetchFilmById.fulfilled]: (state, action) => {
      entityAdapter.addOne(state, action.payload);
    },
    [fetchFilmById.rejected]: (state, action) => {},
    [fetchFilmsByIds.fulfilled]: (state, action) => {
      entityAdapter.addMany(state, action.payload);
    }
  }
});

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById
} = entityAdapter.getSelectors((state) => state.films);

export const selectFilmsByCharacter = createSelector(
  [
    selectAllFilms,
    (state, charId) => {
      return state.characters.entities[charId];
    }
  ],
  (films, character) => {
    if (character) {
      return character.films.reduce((acc, filmId) => {
        const film = films.find((film) => film.id == filmId);
        if (film) acc.push(film);
        return acc;
      }, []);
    }
    return [];
  }
);

export default slice.reducer;
