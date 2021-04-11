import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterById, selectCharacterById } from "./charactersSlice";
import { selectFilmsByCharacter } from "./filmsSlice";
import FilmsList from "./FilmsList";

export default function CharacterPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { charId } = useParams();
  const dispatch = useDispatch();
  const character = useSelector((state) => selectCharacterById(state, charId));
  const relatedFilms = useSelector((state) =>
    selectFilmsByCharacter(state, charId)
  );

  useEffect(() => {
    dispatch(fetchCharacterById(Number(charId))).then(({ meta, error }) => {
      if (meta.requestStatus === "fulfilled") setLoading(false);
      if (meta.requestStatus === "rejected") setError(error);
    });
  }, [dispatch, charId]);

  if (error) return <p>{error.message}</p>;
  if (loading) return "Loading";

  return (
    <div>
      <h2>{character.name}</h2>
      <FilmsList films={relatedFilms} />
    </div>
  );
}
