import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

import Title from "../Title";
import Progress from "../../assets/images/crecimiento.png";

import "../../sass/components/InfoSection.scss";

const InfoSection = ({ ipCountry, apiKey }) => {
  const [chartData, setChartData] = useState({});
  const [selectValue, setSelectValue] = useState("Recoverd");
  const [loadingGrafic, setLoadingGrafic] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const iconCss = useRef();

  const showValueOptions = () => {
    if (!showOptions) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const changeOptions = (option) => {
    setSelectValue(option);
    setShowOptions(false);
  };

  const fetchCasesDay = async () => {
    let fechas = [];
    let numfechas = [];
    setLoadingGrafic(true);

    const config = {
      headers: {
        "X-Authorization": apiKey,
      },
    };

    const { data: info } = await Axios.get(
      `https://www.cyberpurge.com/api/covid/weeklyRegional${selectValue}Cases/${ipCountry}`,
      config
    );

    let { data } = info;

    for (let prop in data) {
      fechas.push(prop);
      numfechas.push(data[prop]);
    }

    setChartData({
      labels: fechas.map((item) =>
        new Intl.DateTimeFormat("es-PE", {
          month: "short",
          day: "numeric",
        }).format(new Date(item))
      ),
      datasets: [
        {
          fill: "start",
          data: numfechas,
        },
      ],
    });
    setLoadingGrafic(false);
  };

  useEffect(() => {
    fetchCasesDay();
  }, [selectValue]);

  useEffect(() => {
    const hideOptions = () => showOptions && setShowOptions(false);
    document.addEventListener("click", hideOptions);

    showOptions
      ? iconCss.current.classList.add("voltear-icon")
      : iconCss.current.classList.remove("voltear-icon");

    return () => document.removeEventListener("click", hideOptions);
  }, [showOptions]);

  return (
    <section className="infoSection style-box">
      <Title title="Casos totales" subtitle="Diarios" img={Progress} />
      <div className="infoSection__options">
        <div className="select-vibbe">
          <p
            className="select-vibbe__btn"
            onClick={showValueOptions}
            ref={iconCss}
          >
            {selectValue === "Recoverd" ? "Recuperados" : "Muertes"}
          </p>
          {showOptions && (
            <ul className="select-vibbe__option">
              <li
                onClick={() =>
                  selectValue == "Recoverd"
                    ? changeOptions("Deceased")
                    : changeOptions("Recoverd")
                }
              >
                {selectValue == "Recoverd" ? "Muertes" : "Recuperados"}
              </li>
              {/* <li onClick={() => changeOptions("Deceased")}>Muertes</li> */}
            </ul>
          )}
        </div>
        <div className="date-history ">
          <span className="icon-historico"></span>
          <p>Ultimos 7 días</p>
        </div>
      </div>
      <div className="infoSection__graphic">
        {loadingGrafic && <div className="graphic-loader"></div>}
        <Line
          data={chartData}
          options={{
            scales: {
              xAxes: [
                {
                  ticks: {
                    maxTicksLimit: 3,
                    fontSize: 14,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    maxTicksLimit: 6,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            elements: {
              line: {
                tension: 0,
                borderWidth: 4,
                fill: true,
                backgroundColor: function () {
                  if (loadingGrafic) {
                    return "rgba(0, 0, 0, 0.2)";
                  }
                  return selectValue == "Recoverd"
                    ? "rgba(112, 168, 0, 0.2)"
                    : "rgba(230, 0, 0, 0.2)";
                },
                borderColor: function () {
                  if (loadingGrafic) {
                    return "rgba(0, 0, 0, 0.5)";
                  }
                  return selectValue == "Recoverd" ? "#70a800" : "#e60000";
                },
              },
              point: {
                radius: 4.5,
                borderWidth: 4.5,
                backgroundColor: function () {
                  if (loadingGrafic) {
                    return "rgba(0, 0, 0, 0.5)";
                  }
                  return selectValue == "Recoverd" ? "#70a800" : "#e60000";
                },
                hoverRadius: 6,
                hoverBorderWidth: 6,
              },
            },
            tooltips: {
              mode: "x-axis",
              intersect: false,
              position: "nearest",
              bodySpacing: 5,
              xPadding: 8,
              yPadding: 8,
            },
          }}
        />
      </div>
    </section>
  );
};

export default InfoSection;
