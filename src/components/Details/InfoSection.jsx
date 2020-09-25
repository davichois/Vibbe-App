import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const InfoSection = ({ todayDeaths, todayCases }) => {
  const [chartData, setChartData] = useState({});
  // const listCard = [
  //   {
  //     totalName: "Total de casos",
  //     numero: todayCases,
  //     typeCase: "cases",
  //   },
  //   {
  //     totalName: "Total de muertes",
  //     numero: todayDeaths,
  //     typeCase: "deaths",
  //   },
  // ];
  const chart = () => {
    setChartData({
      labels: [
        "18 sep.",
        "19 sep.",
        "20 sep.",
        "21 sep.",
        "22 sep.",
        "23 sep.",
        "24 sep.",
      ],
      datasets: [
        {
          label: "Recuperados",
          data: [35881, 36855, 31799, 26447, 49385, 46585, 52797],
          borderColor: "#70a800",
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <section className="infoSection style-box">
      <div className="infoSection__title">
        <figure className="icon-historia"></figure>
        <h2>Datos diarios</h2>
      </div>
      <div className="infoSection__details">
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
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            elements: {
              line: {
                tension: 0.1,
                borderWidth: 3,
                fill: false,
              },
              point: {
                radius: 3,
                borderWidth: 3,
                backgroundColor: "#70a800",
                hoverRadius: 4,
                hoverBorderWidth: 3,
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
