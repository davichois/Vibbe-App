import React, { useState, useEffect } from "react";
import Axios from "axios";
import desfactor from "../helpers/desfactor";

import Title from "../components/Title";
import iconToxico from "../assets/images/toxico.svg";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import LoaderContainer from "../components/LoaderContainer";

const Departamentos = () => {
  const [loader, setLoader] = useState(false);
  const [apiUbicaciones, setApiUbicaciones] = useState([]);

  const APIUBICACIONES = "https://vibbeapi.herokuapp.com/api/covid19";

  const fetchUbicaciones = async () => {
    setLoader(true);
    try {
      const { data } = await Axios.get(APIUBICACIONES);
      setApiUbicaciones(data.message);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  return (
    <>
      {loader ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <section className="stat-table">
          <Title title="Lista de  " subtitle="Departamentos" img={iconToxico} />
          <table className="stat-table__content">
            <thead className="th_list">
              <tr>
                <th className="th_item">Ubicación</th>
                <th className="th_item tb-right">Confirmados</th>
                <th className="th_item tb-right">Muertes</th>
              </tr>
            </thead>
            <tbody>
              {apiUbicaciones.map((item) => (
                <tr className="tb_list" key={item._id}>
                  <td className="tb_item">
                    <div>
                      <Link to={`/departamentos/${item._id}/edit`}>
                        <img src={item.banderaUrl} alt={item.departamento} />
                        <span>{item.departamento}</span>
                      </Link>
                    </div>
                  </td>
                  <td className="tb_item tb-right">
                    {desfactor(item.confirmados || 0)}
                  </td>
                  <td className="tb_item tb-right">
                    {desfactor(item.muertes || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default Departamentos;
