import React, { useState, useEffect } from "react";
import Axios from "axios";
import desfactor from "../helpers/desfactor";

import Loader from "../components/Loader";
import LoaderContainer from "../components/LoaderContainer";

import "../sass/pages/DepartamentosEdit.scss";

const DepartamentosEdit = ({ match, history }) => {
  const [loader, setLoader] = useState(false);
  const [depart, setDepart] = useState({
    departamento: "",
    confirmados: "",
    muertes: "",
  });

  const DepartamentoId = match.params.departId;

  const fetchDepart = async () => {
    setLoader(true);
    try {
      const { data } = await Axios.get(
        `https://vibbeapi.herokuapp.com/api/covid19/${DepartamentoId}`
      );
      setDepart(data.message);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    setDepart({
      ...depart,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const body = {
        bandera: depart.banderaUrl,
        departamento: depart.departamento,
        confirmados: depart.confirmados,
        recuperados: depart.recuperados,
        muertes: depart.muertes,
      };

      await Axios.put(
        `https://vibbeapi.herokuapp.com/api/covid19/${DepartamentoId}`,
        body
      );

      setLoader(false);
      history.push("/departamentos");
    } catch (error) {
      console.log(error);
    }

    // console.log(body);
  };

  useEffect(() => {
    fetchDepart();
  }, []);

  return (
    <>
      {loader ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <main className="departEdit style-box">
          <div className="departEdit__back">
            <i
              className="icon-izquierda"
              onClick={() => history.push("/departamentos")}
            ></i>
          </div>
          <div className="departEdit__preview">
            <div className="preview__depart">
              <img src={depart.banderaUrl} alt="" />
              <h1>{depart.departamento || "Departamento"}</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Confirmados</th>
                  <th>Muertes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{desfactor(depart.confirmados || 0)}</td>
                  <td>{desfactor(depart.muertes || 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <form className="departEdit__form" onSubmit={handleSubmit}>
            <div className="form__inputs">
              <label htmlFor="departamento">Departamento:</label>
              <input
                type="text"
                name="departamento"
                className="form__input"
                onChange={handleChange}
                value={depart.departamento}
                required
              />
              <label htmlFor="confirmados">Confirmados:</label>
              <input
                type="number"
                name="confirmados"
                className="form__input"
                onChange={handleChange}
                value={depart.confirmados}
                required
              />
              <label htmlFor="muertes">Muertes:</label>
              <input
                type="number"
                name="muertes"
                className="form__input"
                onChange={handleChange}
                value={depart.muertes}
                required
              />
            </div>
            <button className="btn btn-primary">Guardar</button>
          </form>
        </main>
      )}
    </>
  );
};

export default DepartamentosEdit;
