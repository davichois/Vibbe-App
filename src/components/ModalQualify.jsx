import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "./Loader";

const ModalQualify = ({ onClose }) => {
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const [comments, setComments] = useState("");
  const [likes, setLikes] = useState(0);
  const [requiredQualify, setRequiredQualify] = useState("");

  const handleRadio = (value) => {
    setLikes(value);
  };

  const handleText = (e) => {
    setComments(e.target.value);
  };

  const valueLikes = () => {
    const DEFAULTCOLOR = (document.querySelector(".points_value").style.color =
      "#1f1f1f");
    !likes === 0 && DEFAULTCOLOR;

    switch (likes) {
      case 0:
        setRequiredQualify("Se requiere calificación");
        break;
      case 1:
        setRequiredQualify("No me gustó nada");
        break;
      case 2:
        setRequiredQualify("No me gustó");
        break;
      case 3:
        setRequiredQualify("Está bien");
        break;
      case 4:
        setRequiredQualify("Me gustó");
        break;
      case 5:
        setRequiredQualify("Me encantó");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (likes === 0) {
      console.log("debe rellenar");
      document.querySelector(".points_value").style.color = "#e60000";
    } else {
      setLoader(true);
      try {
        const body = {
          comments,
          likes,
        };
        await Axios.post(
          "https://vibbeapi.herokuapp.com/api/comentarios/",
          body
        );
        setLoader(false);
        setChecked(true);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    valueLikes();
    const btnSubmit = document.querySelector(".btn-primary");
    if (likes === 0) {
      btnSubmit.style.opacity = 0.85;
    } else {
      btnSubmit.style.opacity = 1;
    }
  }, [likes]);

  return !checked ? (
    <div className="modalQualify">
      <div className="modalQualify__description">
        <h1>Danos tu opinión!</h1>
        <p>
          Recuerda que tus opiniones son anónimas, asi que sientete libre de
          hacerlo
        </p>
      </div>
      <form className="modalQualify__form form" onSubmit={handleSubmit}>
        <div className="form__points">
          <div className="points_num">
            <input
              className="input_points"
              type="radio"
              checked={likes === 5}
              onChange={() => handleRadio(5)}
              id="cinco"
            />
            <label className="label_points icon-star" htmlFor="cinco"></label>
            <input
              className="input_points"
              type="radio"
              checked={likes === 4}
              onChange={() => handleRadio(4)}
              value="4"
              id="cuatro"
            />
            <label className="label_points icon-star" htmlFor="cuatro"></label>
            <input
              className="input_points"
              type="radio"
              checked={likes === 3}
              onChange={() => handleRadio(3)}
              value="3"
              id="tres"
            />
            <label className="label_points icon-star" htmlFor="tres"></label>
            <input
              className="input_points"
              type="radio"
              checked={likes === 2}
              onChange={() => handleRadio(2)}
              value="2"
              id="dos"
            />
            <label className="label_points icon-star" htmlFor="dos"></label>
            <input
              className="input_points"
              type="radio"
              checked={likes === 1}
              onChange={() => handleRadio(1)}
              value="1"
              id="uno"
            />
            <label className="label_points icon-star" htmlFor="uno"></label>
          </div>
          <span className="points_value">{requiredQualify}</span>
        </div>
        <div className="form__comments">
          <textarea
            placeholder="¿Cuentanos que te parecio Vibbe? ¿La recomendarias?"
            maxLength="120"
            onChange={handleText}
            value={comments}
          ></textarea>
        </div>
        <div className="form__buttons">
          <button className="btn btn-danger" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </div>
      </form>
      {loader && (
        <div className="Loader_container">
          <Loader />
        </div>
      )}
    </div>
  ) : (
    <div className="modalQualify__checked">
      <i className="icon-checked"></i>
      <h1>Gracias por Calificarnos</h1>
    </div>
  );
};

export default ModalQualify;
