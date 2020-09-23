import React, { useState, useEffect } from "react";
import desfactor from "../helpers/desfactor";
import axios from "axios";

import Search from "../components/Search";
import Rankis from "../components/Rankis";
import ListCountry from "../components/ListCountry";
import Loader from "../components/Loader";
import LoaderContainer from "../components/LoaderContainer";
import CodeError from "../components/CodeError";

const Countries = () => {
  const API = `https://corona.lmao.ninja/v2/countries?sort=cases`;

  // Estados
  const [countries, setCountries] = useState(undefined);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(API);
      setCountries(data);
      const datores = data.map((data) => {
        let newPais = {
          ["country"]: data.country,
          ["bandera"]: data.countryInfo.flag,
          ["cases"]: data.cases,
        };
        return newPais;
      });
      const datosdiez = datores.slice(0, 10);
      console.log(datosdiez);
      setLoader(false);
    } catch (error) {
      console.error("¡Error!: ", error.message);
      setLoader(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    // return () => console.clear();
  }, []);

  if (loader) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  if (error) {
    return <CodeError code={error.response.status} />;
  }

  // Search Filter
  const filterCountries = countries.filter((item) => {
    return item.country.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <Search value={query} onChange={(e) => setQuery(e.target.value)} />
      {filterCountries.length === 0 ? (
        <div>
          <h1>No se encontro tu pais</h1>
          <p>Prueba escribiendo tu pais en ingles</p>
        </div>
      ) : (
        <Rankis>
          {filterCountries.map((item) => (
            <ListCountry
              key={item.country}
              avatarCountry={item.countryInfo.flag}
              nameCountry={item.country}
              numCountry={desfactor(item.cases)}
            />
          ))}
        </Rankis>
      )}
    </>
  );
};

export default Countries;
