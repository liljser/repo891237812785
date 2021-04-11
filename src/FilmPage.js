import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectFilmById, fetchFilmById } from "./filmsSlice";
import { selectCharactersByFilm } from "./charactersSlice";
import Film from "./Film";

export default function FilmPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filmId } = useParams();
  const dispatch = useDispatch();
  const film = useSelector((state) => selectFilmById(state, filmId));
  const relatedCharacters = useSelector((state) =>
    selectCharactersByFilm(state, filmId)
  );

  useEffect(() => {
    dispatch(fetchFilmById(Number(filmId))).then(({ meta, error }) => {
      if (meta.requestStatus === "fulfilled") setLoading(false);
      if (meta.requestStatus === "rejected") setError(error);
    });
  }, [dispatch, filmId]);

  if (error) return <p>{error.message}</p>;
  if (loading) return "Loading";

  return (
    <div>
      <Film characters={relatedCharacters} title={film.title} />
    </div>
  );
}
