import React from "react";
import { NavLink } from "react-router-dom";
import useDesktop from "../hooks/useDesktop";

import "../sass/components/Navbar.scss";
import Logo from "./Logo";

const NavAdmin = ({ handleLogout }) => {
  return (
    <>
      <NavLink
        exact
        to="/admin/departamentos"
        activeClassName="w-active"
        className="navbar__item"
      >
        <i className="icon-globo"></i>
        {!useDesktop() && <span>Regiones</span>}
      </NavLink>
      <NavLink
        exact
        to="/admin/calificaciones"
        activeClassName="w-active"
        className="navbar__item"
      >
        <i className="icon-star"></i>
        {!useDesktop() && <span>Calificación</span>}
      </NavLink>
      <NavLink
        exact
        to="/admin/estadisticas"
        activeClassName="w-active"
        className="navbar__item"
      >
        <i className="icon-grafico"></i>
        {!useDesktop() && <span>Estadisticas</span>}
      </NavLink>
      <li className="navbar__item" onClick={handleLogout}>
        <i className="icon-logout"></i>
        {!useDesktop() && <span>Salir</span>}
      </li>
    </>
  );
};

const NavPublic = ({ ipCountry }) => {
  return (
    <>
      <NavLink exact to="/" activeClassName="w-active" className="navbar__item">
        <i className="icon-globo"></i>
        {!useDesktop() && <span>Global</span>}
      </NavLink>
      <NavLink
        exact
        to={`/countries/${ipCountry}`}
        activeClassName="w-active"
        className="navbar__item"
      >
        <i className="icon-bandera"></i>
        {!useDesktop() && <span>Paises</span>}
      </NavLink>
      <NavLink
        exact
        to="/health"
        activeClassName="w-active"
        className="navbar__item"
      >
        <i className="icon-corazon"></i>
        {!useDesktop() && <span>Salud</span>}
      </NavLink>
      <NavLink
        exact
        to="/about"
        activeClassName="w-active"
        className="navbar__item"
      >
        <i className="icon-about"></i>
        {!useDesktop() && <span>About</span>}
      </NavLink>
    </>
  );
};

const Navbar = ({ admin, handleLogout, ipCountry }) => {
  return (
    <header className="header">
      <div className="header__container">
        {useDesktop(1024) && <Logo />}
        <div className="navbar">
          {admin ? (
            <NavAdmin handleLogout={handleLogout} />
          ) : (
            <NavPublic ipCountry={ipCountry} />
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
