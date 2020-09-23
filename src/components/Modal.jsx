import React from "react";
import { createPortal } from "react-dom";
import "../sass/components/_Modal.scss";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="Modal" id="overlay">
      <div className="Modal__close" onClick={onClose}></div>
      <div className="Modal__container" id="model">
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
