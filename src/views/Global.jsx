import React, { useState, useEffect } from "react";
import Axios from "axios";
import GoogleMaps from "simple-react-google-maps";

import Slogan from "../components/Slogan";
import InfoResume from "../components/Details/InfoResume";
import imgSlogan from "../assets/images/virus.png";
import CodeError from "../components/CodeError";
import Loader from "../components/Loader";

const Global = () => {
  const [global, setGlobal] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = `https://corona.lmao.ninja/v2/all?yesterday`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get(API);
      setGlobal(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("¡Error!: ", error.message);
    }
  };

  const datoEnEspanish = () => {
    console.log(
      new Intl.DateTimeFormat("es-MX", {
        month: "short",
        day: "numeric",
      }).format(new Date("09-19"))
    );
  };

  useEffect(() => {
    fetchData();
    datoEnEspanish();
  }, []);

  if (error) {
    return <CodeError code={error.response.status} />;
  }

  return (
    <>
      <Slogan
        imgSlogan={imgSlogan}
        lem1={"#ESTEVIRUS"}
        lem2={"LO PARAMOS UNIDOS"}
      />
      {global === undefined ? (
        <>{loading && <Loader />}</>
      ) : (
        <>
          <InfoResume {...global} />
          <GoogleMaps
            apiKey={"AIzaSyByxQoPRPSATulJClOd2o2CrBqYNbKUgEc"}
            style={{ height: "290px", width: "100%" }}
            zoom={1.3}
            center={{
              lat: 15,
              lng: 10,
            }}
          />
        </>
      )}
    </>
  );
};

export default Global;
