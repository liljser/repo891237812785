import React from "react";
import EntityDetailsList from "../../components/EntityDetailsList";

export default function Film({ title, characters }) {
  return (
    <div>
      <h2>{title}</h2>
      <EntityDetailsList entitiesName="characters" entities={characters} />
    </div>
  );
}
