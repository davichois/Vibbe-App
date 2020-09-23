import React from "react";

import Title from "./Title";
import ImgTop from "../assets/images/reporte.png";

const Rankis = ({ children }) => {
  return (
    <main className="Rankis style-box">
      <Title title="Top de paises" subtitle="Más Infectados" img={ImgTop} />
      <div className="Rankis__list">{children}</div>
    </main>
  );
};

export default Rankis;
