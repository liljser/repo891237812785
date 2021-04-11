import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllFilms, fetchFilms } from "./filmsSlice";
import FilmsList from "./FilmsList";

export default function HomePage() {
  const dispatch = useDispatch();
  const films = useSelector(selectAllFilms);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  return (
    <div>
      <h2>HomePage</h2>
      <FilmsList films={films} />
    </div>
  );
}
