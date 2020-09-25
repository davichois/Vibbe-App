import React, { useState, useEffect } from "react";
import Axios from "axios";
import desfactor from "../helpers/desfactor";

import InfoResume from "../components/Details/InfoResume";
import InfoSection from "../components/Details/InfoSection";
import TitleCountry from "../components/TitleCountry";
import Title from "../components/Title";
import iconToxico from "../assets/images/toxico.svg";
import Loader from "../components/Loader";

import "../sass/pages/CountryDetails.scss";
import LoaderContainer from "../components/LoaderContainer";

const CountryDetails = ({ ipCountry }) => {
  const [loader, setLoader] = useState(false);
  const [detailsCountry, setDetailsCountry] = useState({
    countryInfo: {},
  });
  const [apiUbicaciones, setApiUbicaciones] = useState([]);

  const API = `https://corona.lmao.ninja/v2/countries/`;
  const APIUBICACIONES = "https://vibbeapi.herokuapp.com/api/covid19";
  // const ID_API = match.params.countryId;

  const fetchData = async () => {
    try {
      const { data } = await Axios.get(`${API}${ipCountry}?yesterday=true`);
      setDetailsCountry(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchData();
    fetchUbicaciones();
  }, [ipCountry]);

  if (ipCountry === null) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <>
      <TitleCountry
        nameCountry={detailsCountry.country}
        avatar={detailsCountry.countryInfo.flag}
      />
      <InfoResume {...detailsCountry} />
      <InfoSection
        todayDeaths={desfactor(detailsCountry.todayDeaths || 0)}
        todayCases={desfactor(detailsCountry.todayCases || 0)}
      />
      {detailsCountry.country === "Peru" && (
        <>
          {loader ? (
            <div>
              <Loader />
            </div>
          ) : (
            <section className="stat-table style-box">
              <Title
                title="Casos"
                subtitle="Departamentales"
                img={iconToxico}
              />
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
                          <img src={item.banderaUrl} alt={item.departamento} />
                          <span>{item.departamento}</span>
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
      )}
    </>
  );
};

export default CountryDetails;
