import React from "react";
import { Link } from "react-router-dom";

import "../sass/components/ListCountry.scss";

const ListCountry = ({ avatarCountry, nameCountry, numCountry }) => {
  return (
    <article className="ListCountry">
      <Link to={`/countries/${nameCountry}`}>
        <img src={avatarCountry} alt="Img Afghanistan" />
        <p>{nameCountry}</p>
        <span>{numCountry}</span>
      </Link>
    </article>
  );
};

export default ListCountry;
