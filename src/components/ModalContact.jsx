import React from "react";

import imgInstagram from "../assets/images/instagram-bosquejado.png";
import imgGmail from "../assets/images/gmail.png";
import imgTelegram from "../assets/images/telegram.png";

const ModalContact = () => {
  return (
    <section className="modalContact">
      <h1>¿Quieres Contactarnos?</h1>
      <p>Elige el medio que más te convenga </p>
      <ul>
        <li>
          <img src={imgInstagram} alt="Instagram" />
          <span>Instagram</span>
        </li>
        <li>
          <img src={imgTelegram} alt="Instagram" />
          <span>Telegram</span>
        </li>
        <li>
          <img src={imgGmail} alt="Instagram" />
          <span>Gmail</span>
        </li>
      </ul>
    </section>
  );
};

export default ModalContact;
