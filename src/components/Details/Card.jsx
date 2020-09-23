import React from "react";

const Card = ({ totalName, numCases, colorCases }) => {
  let card = `card ${colorCases}`;
  let cardTitle = `card__title ${colorCases}`;
  let cardImg = `icon-team card__img ${colorCases}`;

  return (
    <article className={card}>
      <h3 className={cardTitle}>{totalName}</h3>
      <span className={cardImg}></span>
      <div className="card__count">
        <p>{numCases}</p>
        <span>personas</span>
      </div>
    </article>
  );
};

export default Card;
