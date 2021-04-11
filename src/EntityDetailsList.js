import React from "react";
import { Link } from "react-router-dom";

export default function FilmDetailsList({ entitiesName, entities }) {
  return (
    <>
      {entitiesName}:
      <ul>
        {entities.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/${entitiesName}/${id}/`}>{name}</Link>
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}
