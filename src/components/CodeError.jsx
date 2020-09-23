import React from "react";

import "../sass/components/CodeError.scss";

const CodeError = ({ code }) => {
  return (
    <>
      <div className="error">
        <div className="error__preview">
          <div className="error__container">
            <span className="icon-muerto image__p" />
            <span className="icon-bacterias image__s " />
            <span className="icon-bacterias image__t " />
          </div>
        </div>
        <h1>{code} ERROR</h1>
        {code === 404 ? (
          <p>¡Ups! Parece que algo anda mal, estamos trabajando en ello.</p>
        ) : (
          <p>
            ¡Ups! Estamos teniendo problemas con nuestros servidores, no hiciste
            nada malo estamos trabajando en ello.
          </p>
        )}
      </div>
      <div className="error_bar">
        <span>{code} Error</span>
      </div>
    </>
  );
};

export default CodeError;
