import React from "react";

import Card from "./Card";

const CardList = ({ critical, active, deaths, recovered }) => {
  const listCard = [
    {
      totalName: "Casos Criticos",
      numero: critical,
      typeCase: "cases",
      iconCases: "icon-critico",
    },
    {
      totalName: "Total de activos",
      numero: active,
      typeCase: "active",
      iconCases: "icon-mascarilla-medica card--medium-img",
    },
    {
      totalName: "Total de muertes",
      numero: deaths,
      typeCase: "deaths",
      iconCases: "icon-lapida",
    },
    {
      totalName: "Total de recuperados",
      numero: recovered,
      typeCase: "recovered",
      iconCases: "icon-team ",
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
          iconCases={item.iconCases}
        />
      ))}
    </div>
  );
};

export default CardList;
