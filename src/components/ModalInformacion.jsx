import React from "react";
// import Modal from "./Modal";

import "../sass/components/_ModalInformacion.scss";

const ModalInformacion = () => {
  return (
    <>
      <div className="ModalInformacion">
        <h1>Fines de la App</h1>
        <p>Esta aplicacion web mobile esta hecho con fines practicos</p>

        <p>
          Todos los datos que muestra esta App son reales y son actualizados
          cada 24h, cabe recalcar que los datos que proporcionamos son de
          fuentes confiables.
        </p>

        <p> Y no recopilamos ningun dato personal del usuario.</p>
        <div>
          <i className="icon-mobile"></i>
          <span>v 1.0.0</span>
        </div>
      </div>
    </>
  );
};

export default ModalInformacion;
