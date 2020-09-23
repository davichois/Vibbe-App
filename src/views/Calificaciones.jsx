import React, { useState, useEffect } from "react";
import Axios from "axios";
// import moment from "moment";
import Loader from "../components/Loader";
import LoaderContainer from "../components/LoaderContainer";
import StarCalification from "../components/StarCalification";

import "../sass/pages/Calificaciones.scss";

// moment.locale("es");

const Calificaciones = () => {
  const API = "https://vibbeapi.herokuapp.com/api/comentarios/";
  const [loader, setLoader] = useState(false);
  const [calification, setCalification] = useState([]);
  const [likesCalification, setLikesCalification] = useState([]);

  const fetchCalification = async () => {
    setLoader(true);
    try {
      const { data } = await Axios.get(API);
      setCalification(data.message);
      setLikesCalification(data.message.map((pts) => pts.likes));
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const calcularPromedio = () => {
    const suma = likesCalification.reduce((count, like) => count + like, 0);
    const total = calification.length;
    const promedio = suma / total;
    if (isNaN(promedio)) {
      return "0.0";
    } else {
      return promedio.toFixed(1);
    }
  };

  const calcularPromedioPorStar = (numero) => {
    let cantidadDeStar = likesCalification.reduce((count, star) => {
      if (star === numero) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    let promedioStar = (cantidadDeStar * 100) / calification.length;

    if (isNaN(promedioStar)) {
      return 0;
    } else {
      return promedioStar.toFixed(1);
    }
  };

  // const calculadorDeTiempo = (fechaApi) => {
  //   const relativeTime = moment(fechaApi).fromNow();
  //   return relativeTime;
  // };

  const handleDeleteOpinion = async (id) => {
    await Axios.delete(API + id);
    fetchCalification();
  };

  useEffect(() => {
    fetchCalification();
  }, []);

  return (
    <>
      {loader ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <main className="calificaciones style-box">
          <div className="calificaciones__resumen">
            <h1>Valoraciones de la App</h1>
            <div className="resumen">
              <div className="resumen_promedio">
                <h1>{calcularPromedio()}</h1>
                <StarCalification value={calcularPromedio()} />
                <p>{calification.length} en total</p>
              </div>
              <div className="resumen_star">
                <div className="star-row">
                  <p>5</p>
                  <div className="bar-progress">
                    <div
                      className="bar-content"
                      style={{ width: `${calcularPromedioPorStar(5)}%` }}
                    ></div>
                  </div>
                  <span>{calcularPromedioPorStar(5) || 0}%</span>
                </div>
                <div className="star-row">
                  <p>4</p>
                  <div className="bar-progress">
                    <div
                      className="bar-content"
                      style={{ width: `${calcularPromedioPorStar(4)}%` }}
                    ></div>
                  </div>
                  <span>{calcularPromedioPorStar(4) || 0}%</span>
                </div>
                <div className="star-row">
                  <p>3</p>
                  <div className="bar-progress">
                    <div
                      className="bar-content"
                      style={{ width: `${calcularPromedioPorStar(3)}%` }}
                    ></div>
                  </div>
                  <span>{calcularPromedioPorStar(3) || 0}%</span>
                </div>
                <div className="star-row">
                  <p>2</p>
                  <div className="bar-progress">
                    <div
                      className="bar-content"
                      style={{ width: `${calcularPromedioPorStar(2)}%` }}
                    ></div>
                  </div>
                  <span>{calcularPromedioPorStar(2) || 0}%</span>
                </div>
                <div className="star-row">
                  <p>1</p>
                  <div className="bar-progress">
                    <div
                      className="bar-content"
                      style={{ width: `${calcularPromedioPorStar(1)}%` }}
                    ></div>
                  </div>
                  <span>{calcularPromedioPorStar(1) || 0}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="calificaciones__content style-box">
            {calification.length === 0 ? (
              <div className="opinion__vacio">
                <p>Aún no hay comentarios</p>
              </div>
            ) : (
              <>
                {calification.map((opinion) => (
                  <div className="opinion" key={opinion._id}>
                    <div className="opinion__header">
                      <div>
                        <StarCalification value={opinion.likes} />
                        {/* <p>{calculadorDeTiempo(opinion.createdAt)}</p> */}
                      </div>
                      <span
                        className="icon-basura btn-delete-opinion"
                        onClick={() => handleDeleteOpinion(opinion._id)}
                      ></span>
                    </div>
                    <div className="opinion__section">
                      {opinion.comments === "" ? (
                        <i>(Sin Comentarios)</i>
                      ) : (
                        opinion.comments
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Calificaciones;
