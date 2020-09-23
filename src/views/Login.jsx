import React, { useState } from "react";

import "../sass/pages/LoginAdmin.scss";

const Login = ({ loginAdmin, history }) => {
  const [adminUser, setAdminUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdminUser({
      ...adminUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(adminUser);
      history.replace("/admin/departamentos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Login Admin</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="input-text"
          type="email"
          name="email"
          placeholder="Tu email"
          onChange={handleChange}
          value={adminUser.email}
        />
        <input
          className="input-text"
          type="password"
          name="password"
          placeholder="Tu Password"
          onChange={handleChange}
          value={adminUser.password}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
