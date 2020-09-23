import React from "react";

const TitleCountry = ({ avatar, nameCountry }) => {
  return (
    <div className="Header style-box">
      <img src={avatar} alt={nameCountry} />
      <h1>{nameCountry}</h1>
    </div>
  );
};

export default TitleCountry;
