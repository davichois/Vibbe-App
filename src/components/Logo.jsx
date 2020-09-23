import React from "react";

import ImgLogo from "../assets/images/avatar.png";

const Logo = ({ devActive }) => {
  let devActiveClas = `Logo_dev ${devActive ? "Logo__active" : ""}`;
  return (
    <div className="Logo">
      <img className="Logo_img" src={ImgLogo} alt="Logo Vibbe" />
      <h1 className="Logo_h1">ibbe</h1>
      <h1 className={devActiveClas}>Developers</h1>
    </div>
  );
};

export default Logo;
