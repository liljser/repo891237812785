import React from "react";
import { Link } from "react-router-dom";

export default function FilmsList({ films }) {
  return (
    <ul>
      {films.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/films/${id}/`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
