import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";
import { setToken, getToken, deleteToken } from "./helpers/auth";
import { getAdminBtn, setAdminBtn } from "./helpers/admin_active";

import CountryDetails from "./views/CountryDetails";
import LoaderContainer from "./components/LoaderContainer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import About from "./views/About";
import Global from "./views/Global";
import Countries from "./views/Countries";
import Login from "./views/Login";
const Health = lazy(() => import("./views/Health"));
const Development = lazy(() => import("./views/Development"));
const Departamentos = lazy(() => import("./views/Departamentos"));
const Calificaciones = lazy(() => import("./views/Calificaciones"));
const Estadisticas = lazy(() => import("./views/Estadisticas"));
const DepartamentosEdit = lazy(() => import("./views/DepartamentosEdit"));

const RoutesAdmin = () => (
  <>
    <div>
      <Suspense
        fallback={
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        }
      >
        <Switch>
          <Route exact path="/admin/departamentos" component={Departamentos} />
          <Route
            exact
            path="/admin/departamentos/:departId/edit"
            component={DepartamentosEdit}
          />
          <Route
            exact
            path="/admin/calificaciones"
            component={Calificaciones}
          />
          <Route exact path="/admin/estadisticas" component={Estadisticas} />
        </Switch>
      </Suspense>
    </div>
  </>
);

const RoutesPublic = ({ ipCountry, clickCount, actAdmin, loginAdmin }) => (
  <>
    <Suspense
      fallback={
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      }
    >
      <Switch>
        <Route exact path="/" component={Global} />
        {/* <Route
          exact
          path="/countries"
          render={(props) => <Countries {...props} ipCountry={ipCountry} />}
        /> */}
        <Route path="/health" component={Health} />
        <Route
          exact
          path="/about"
          render={(props) => (
            <About {...props} clickCount={clickCount} actAdmin={actAdmin} />
          )}
        />
        <Route exact path="/development" component={Development} />
        <Route
          exact
          path="/countries/:countryId"
          render={(props) => (
            <CountryDetails {...props} ipCountry={ipCountry} />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} loginAdmin={loginAdmin} />}
        />
      </Switch>
    </Suspense>
  </>
);

const Routes = () => {
  // estados
  const [admin, setAdmin] = useState(null);
  const [cargandoAdmin, setCargandoAdmin] = useState(true);
  const [actAdmin, setActAdmin] = useState(false);
  const [ipCountry, setIpCountry] = useState("PE");

  // activacion del btn login
  let numClick = 0;

  const clickCount = () => {
    numClick++;
    if (numClick === 4) {
      setActAdmin(true);
      setAdminBtn("true");
      numClick = 0;
    }

    setTimeout(() => {
      numClick = 0;
    }, 1100);
  };

  // login
  const loginAdmin = async (adminUser) => {
    const { data } = await Axios.post(
      "http://localhost:3000/api/auth/login",
      adminUser
    );
    setAdmin({ token: data.body });
    setToken(data.body);
  };

  // logout
  const handleLogout = () => {
    setAdmin(null);
    deleteToken();
    window.location = "/";
  };

  // permanencia del btn admin
  const btnAdminStorage = () => {
    if (getAdminBtn()) {
      setActAdmin(true);
    }
  };

  useEffect(() => {
    async function fetchIP() {
      const { data } = await Axios.get("http://localhost:3000/geo");
      console.log(data["info De Geo"].country);
      setIpCountry(data["info De Geo"].country);
    }

    fetchIP();
  }, []);

  useEffect(() => {
    if (!getToken()) {
      setCargandoAdmin(false);
      return;
    }

    setAdmin({ token: getToken() });
    setCargandoAdmin(false);
  }, [cargandoAdmin]);

  useEffect(() => {
    btnAdminStorage();
  }, [actAdmin]);

  if (cargandoAdmin) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <Router>
      <>
        {admin ? (
          <RoutesAdmin />
        ) : (
          <RoutesPublic
            loginAdmin={loginAdmin}
            actAdmin={actAdmin}
            clickCount={clickCount}
            ipCountry={ipCountry}
          />
        )}
        <Navbar
          admin={admin}
          handleLogout={handleLogout}
          ipCountry={ipCountry}
        />
      </>
    </Router>
  );
};

export default Routes;
