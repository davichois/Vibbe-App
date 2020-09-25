import React, { useState, useEffect } from "react";
import Axios from "axios";
import desfactor from "../helpers/desfactor";

import Slogan from "../components/Slogan";
import InfoResume from "../components/Details/InfoResume";
import InfoSection from "../components/Details/InfoSection";
import imgSlogan from "../assets/images/virus.png";
import CodeError from "../components/CodeError";
import Loader from "../components/Loader";

const Global = () => {
  const [global, setGlobal] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = `https://corona.lmao.ninja/v2/all?yesterday`;

  // Chart.scaleService.updateScaleDefaults("linear", {
  //   ticks: {
  //     // min: 0,
  //     beginAtZero: true,
  //     suggestedMax: 3,
  //   },
  // });

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
          <InfoSection
            todayDeaths={desfactor(global.todayDeaths || 0)}
            todayCases={desfactor(global.todayCases || 0)}
          />
        </>
      )}
    </>
  );
};

export default Global;
