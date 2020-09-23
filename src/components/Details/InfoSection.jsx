import React from "react";

import Card from "./Card";

const InfoSection = ({ todayDeaths, todayCases }) => {
  const listCard = [
    {
      totalName: "Total de casos",
      numero: todayCases,
      typeCase: "cases",
    },
    {
      totalName: "Total de muertes",
      numero: todayDeaths,
      typeCase: "deaths",
    },
  ];

  return (
    <section className="infoSection style-box">
      <div className="infoSection__title">
        <figure className="icon-historia"></figure>
        <h2>Datos de hoy</h2>
        <span>Actualizados cada 10 min</span>
      </div>
      <div className="infoSection__details">
        {listCard.map((item) => (
          <Card
            key={item.totalName}
            totalName={item.totalName}
            numCases={item.numero}
            colorCases={item.typeCase}
          />
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
