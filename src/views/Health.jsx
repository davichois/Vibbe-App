import React from "react";

import Slogan from "../components/Slogan";
import imgDoctor from "../assets/images/doctor.png";
import iconTos from "../assets/images/tos.svg";
import iconFiebre from "../assets/images/fiebre.svg";
import iconCansancio from "../assets/images/cansancio.svg";
import iconDiarrea from "../assets/images/diarrea.svg";
import iconVomito from "../assets/images/vomito.svg";
import iconAsma from "../assets/images/asma.svg";
import iconCabeza from "../assets/images/cabeza.svg";
import iconMalestares from "../assets/images/malestares.svg";
import iconHigiene from "../assets/images/lavarse-las-manos.svg";
import iconDistancia from "../assets/images/distancia.svg";
import iconRutina from "../assets/images/rutina.svg";
import iconLlamar from "../assets/images/llamar.svg";
import iconSintomas from "../assets/images/sintomas.svg";

import "../sass/pages/Health.scss";

const CardSintomas = ({ iconSrc, content }) => (
  <li>
    <img src={iconSrc} alt={content} />
    <p>{content}</p>
  </li>
);

const CardPrev = ({ iconSrc, content }) => (
  <article className="item_prev">
    <img src={iconSrc} alt="" />
    <p>{content}</p>
  </article>
);

const Health = () => {
  return (
    <>
      <Slogan
        imgSlogan={imgDoctor}
        lem1={"QUÉDATE EN"}
        lem2={"CASA, SALVAS VIDAS"}
      />
      <section className="sintomas style-box">
        <h1 className="sintomas__title">Sintomas</h1>
        <ul className="sintomas__list">
          <CardSintomas iconSrc={iconFiebre} content="Fiebre" />
          <CardSintomas iconSrc={iconTos} content="Tos seca" />
          <CardSintomas iconSrc={iconCansancio} content="Cansancio" />
          <CardSintomas iconSrc={iconVomito} content="Vomito" />
          <CardSintomas iconSrc={iconDiarrea} content="Diarrea" />
          <CardSintomas iconSrc={iconAsma} content="Falta de Aire" />
          <CardSintomas iconSrc={iconCabeza} content="Dolor de Cabeza" />
          <CardSintomas
            iconSrc={iconMalestares}
            content="Molestias y dolores"
          />
        </ul>
      </section>
      <section className="prevencion style-box">
        <h1 className="prevencion__title">Prevención</h1>
        <div className="prevencion__content">
          <CardPrev
            iconSrc={iconHigiene}
            content="Lávese las manos con frecuencia. Use agua y jabón o un
              desinfectante de manos a base de alcohol."
          />
          <CardPrev
            iconSrc={iconDistancia}
            content="Manténgase a una distancia segura de cualquier persona que tosa o estornude."
          />
          <CardPrev
            iconSrc={iconRutina}
            content="Manténgase a una distancia segura de cualquier persona que tosa o estornude."
          />
          <CardPrev
            iconSrc={iconLlamar}
            content="Si tiene fiebre, tos y dificultad para respirar, solicite atención médica. Llame con antelación."
          />
          <CardPrev
            iconSrc={iconSintomas}
            content="Cuando tosa o estornude, cúbrase la nariz y la boca con el codo flexionado o con un pañuelo."
          />
        </div>
      </section>
    </>
  );
};

export default Health;
