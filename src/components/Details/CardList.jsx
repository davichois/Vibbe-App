import React from "react";

import Card from "./Card";

const CardList = ({ critical, active, deaths, recovered }) => {
  const listCard = [
    {
      totalName: "Casos Criticos",
      numero: critical,
      typeCase: "cases",
    },
    {
      totalName: "Total de activos",
      numero: active,
      typeCase: "active",
    },
    {
      totalName: "Total de muertes",
      numero: deaths,
      typeCase: "deaths",
    },
    {
      totalName: "Total de recuperados",
      numero: recovered,
      typeCase: "recovered",
    },
  ];

  return (
    <div className="cardList">
      {listCard.map((item) => (
        <Card
          key={item.totalName}
          totalName={item.totalName}
          numCases={item.numero}
          colorCases={item.typeCase}
        />
      ))}
    </div>
  );
};

export default CardList;
