import React from "react";

import Logo from "../components/Logo";

import "../sass/pages/Development.scss";

const Development = () => {
  return (
    <>
      <div className="Develop">
        <div className="Develop__header">
          <div className="Develop__header--scale">
            <Logo devActive={true} />
          </div>
        </div>

        <div className="Dev style-box">
          <div className="Dev__title icon-team1">
            <h2>Autores</h2>
          </div>
          <ul className="Dev__content">
            <li>
              Moises Rolando Machuca Valverde <br /> (Programador Frontend)
            </li>
            <li>
              David Prada Linarez <br /> (Programador Backend)
            </li>
          </ul>
        </div>

        <div className="Dev style-box">
          <div className="Dev__title icon-api">
            <h2>API</h2>
          </div>
          <ul className="Dev__content">
            <li>https://corona.lmao.ninja/v2/countries?yesterday&sort</li>
            <li>https://vibbeapi.herokuapp.com/api/covid19</li>
          </ul>
        </div>

        <div className="Dev style-box">
          <div className="Dev__title icon-boligrafo">
            <h2>Iconos</h2>
          </div>
          <ul className="Dev__content">
            <li>
              Iconos hechos por{" "}
              <a
                href="https://www.flaticon.es/autores/freepik"
                target="_blank"
                title="Freepik"
              >
                Freepik
              </a>{" "}
              de{" "}
              <a
                href="https://www.flaticon.es/"
                target="_blank"
                title="Flaticon"
              >
                @flaticon
              </a>
            </li>
            <li>
              Iconos hechos por{" "}
              <a
                href="https://www.flaticon.es/autores/flat-icons"
                target="_blank"
                title="Flat Icons"
              >
                Flat Icons
              </a>{" "}
              de{" "}
              <a
                href="https://www.flaticon.es/"
                target="_blank"
                title="Flaticon"
              >
                @flaticon
              </a>
            </li>
            <li>
              Iconos hechos por{" "}
              <a
                href="https://www.flaticon.es/autores/pixel-perfect"
                title="Pixel perfect"
              >
                Pixel perfect
              </a>{" "}
              de{" "}
              <a
                href="https://www.flaticon.es/"
                target="_blank"
                title="Flaticon"
              >
                @flaticon
              </a>
            </li>
          </ul>
        </div>

        <div className="Dev style-box">
          <div className="Dev__title icon-github">
            <h2>Repositorio</h2>
          </div>
          <ul className="Dev__content">
            <li>https://github.com/rolan19/Vibbe-App/tree/development</li>
          </ul>
        </div>

        <div className="Dev style-box">
          <div className="Dev__title icon-dev">
            <h2>Resumen</h2>
          </div>
          <ul className="Dev__content-parrafo">
            <span>
              Esta área fue creada para aquellos programadores web que quieran
              investigar y quizas podamos ayudar a otros con este proyecto
              practico que hemos desarrollado
            </span>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Development;
