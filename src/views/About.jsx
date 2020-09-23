import React, { useState } from "react";
import { Link } from "react-router-dom";

// import ImgLogo from "../assets/images/avatar.png";
import ModalInformacion from "../components/ModalInformacion";
import Modal from "../components/Modal";
import Logo from "../components/Logo";
import ModalContact from "../components/ModalContact";
import ModalQualify from "../components/ModalQualify";

import "../sass/pages/About.scss";
import useDesktop from "../hooks/useDesktop";

const About = ({ actAdmin, clickCount, history }) => {
  const [modalInformation, setModalInformation] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalQualify, setModalQualify] = useState(false);

  const handleClickShare = () => {
    !navigator.share && console.log("Not suport");

    navigator
      .share({
        title: "Vibbe",
        text: "Datos del Covid-19",
        url: document.location.href,
      })
      .then(() => console.log("Compartido"))
      .catch(() => console.log("Hubo un error"));
  };

  const handleAuthLocal = () => {
    history.push("/login");
  };

  return (
    <>
      <div className="About">
        {!useDesktop() && (
          <div className="About__header" onClick={clickCount}>
            <Logo />
          </div>
        )}

        <div className="About__footer">
          <ul>
            <li className="icon-share" onClick={handleClickShare}>
              Compartir
            </li>
            <li className="icon-star" onClick={() => setModalQualify(true)}>
              Calificar
            </li>
            <li
              className="icon-about"
              onClick={() => setModalInformation(true)}
            >
              Información
            </li>
            {/* <li className="icon-config">Configuración</li> */}
            <li className="icon-comment" onClick={() => setModalContact(true)}>
              Contáctanos
            </li>
            <li className="icon-dev">
              <Link to="/development">Desarrolladores</Link>
            </li>
            {actAdmin && (
              <li className="icon-config" onClick={handleAuthLocal}>
                <p>Administradores</p>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Modal isOpen={modalQualify} onClose={() => setModalQualify(false)}>
        <ModalQualify onClose={() => setModalQualify(false)} />
      </Modal>
      <Modal
        isOpen={modalInformation}
        onClose={() => setModalInformation(false)}
      >
        <ModalInformacion />
      </Modal>
      <Modal isOpen={modalContact} onClose={() => setModalContact(false)}>
        <ModalContact />
      </Modal>
    </>
  );
};

export default About;
