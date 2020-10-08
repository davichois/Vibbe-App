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
import Search from "../components/Search";

const CountryDetails = ({ ipCountry }) => {
  const [detailsCountry, setDetailsCountry] = useState({
    countryInfo: {},
  });
  const [loaderRegionCases, setLoaderRegionCases] = useState(false);
  const [dataRegionCases, setDataRegionCases] = useState(null);
  const [valueSearch, setValueSearch] = useState("");

  const API = `https://corona.lmao.ninja/v2/countries/`;
  let apiKey = "a56b5b3f-9808-44ad-ba5d-fc8b90aa4225";

  // const APIUBICACIONES = "https://vibbeapi.herokuapp.com/api/covid19";

  // obteniendo datos generales
  const fetchData = async () => {
    try {
      const { data } = await Axios.get(`${API}${ipCountry}?yesterday=true`);
      setDetailsCountry(data);
    } catch (error) {
      console.log(error);
    }
  };

  // obteniendo datos por region
  const fetchRegionalCases = async () => {
    setLoaderRegionCases(true);
    try {
      const config = {
        headers: {
          "X-Authorization": apiKey,
        },
      };
      const { data: dataRegion } = await Axios.get(
        `https://www.cyberpurge.com/api/covid/regionalDataByCountry/${ipCountry}`,
        config
      );
      setDataRegionCases(dataRegion.data);
      setLoaderRegionCases(false);
    } catch (error) {
      console.error(error);
      setLoaderRegionCases(false);
    }
  };

  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };

  // efectos
  useEffect(() => {
    if (ipCountry != null) {
      fetchData();
      fetchRegionalCases();
    }
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
      <Search onChange={handleChangeSearch} value={valueSearch} />

      <TitleCountry
        nameCountry={detailsCountry.country}
        avatar={detailsCountry.countryInfo.flag}
      />
      <InfoResume {...detailsCountry} />
      <InfoSection ipCountry={ipCountry} apiKey={apiKey} />
      <>
        {loaderRegionCases ? (
          <div>
            <Loader />
          </div>
        ) : (
          <section className="stat-table style-box">
            <Title title="Casos" subtitle="Regionales" img={iconToxico} />
            {dataRegionCases != null &&
              (dataRegionCases.length === 0 ? (
                <h1 style={{ textAlign: "center" }}>No hay Datos</h1>
              ) : (
                <TableRegionCases dataRegionCases={dataRegionCases} />
              ))}
          </section>
        )}
      </>
    </>
  );
};

export default CountryDetails;

function TableRegionCases({ dataRegionCases }) {
  return (
    <table className="stat-table">
      <thead className="th_list">
        <tr>
          <th className="th_item">Ubicación</th>
          <th className="th_item tb-right">Confirmados</th>
          <th className="th_item tb-right">Muertes</th>
        </tr>
      </thead>
      <tbody>
        {dataRegionCases.map((region) => (
          <tr className="tb_list" key={region.regionName}>
            <td className="tb_item">
              <div>
                <img
                  src={`https:${region.regionFlagUrl}`}
                  alt={region.regionName}
                />
                <span>{region.regionName}</span>
              </div>
            </td>
            <td className="tb_item tb-right">
              {region.casesCount === 0 ? "-" : desfactor(region.casesCount)}
            </td>
            <td className="tb_item tb-right">
              {region.recoveredCount === 0
                ? "-"
                : desfactor(region.recoveredCount || 0)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
