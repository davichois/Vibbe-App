import React from "react";

import "../sass/components/_Slogan.scss";

const Slogan = ({ imgSlogan, lem1, lem2 }) => {
  return (
    <section className="Slogan">
      <img className="Slogan__img" src={imgSlogan} alt="Slogan" />
      <p className="Slogan__title">
        <span>{lem1}</span>
        <span>{lem2}</span>
      </p>
    </section>
  );
};

export default Slogan;
