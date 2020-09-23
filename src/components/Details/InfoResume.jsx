import React from "react";
import desfactor from "../../helpers/desfactor";

import CardList from "./CardList";
import Progress from "../../assets/images/crecimiento.png";

import Title from "../Title";

const InfoResume = ({ cases, active, deaths, recovered, critical }) => {
  return (
    <section className="infoResume style-box">
      <Title
        title="Casos totales"
        subtitle={desfactor(cases || 0)}
        img={Progress}
      />
      <CardList
        critical={desfactor(critical || 0)}
        active={desfactor(active || 0)}
        deaths={desfactor(deaths || 0)}
        recovered={desfactor(recovered || 0)}
      />
    </section>
  );
};

export default InfoResume;
