import React from "react";
import { render } from "react-dom";
import Routes from "./Routes";
import "./assets/icons/style.css";
import "./sass/main.scss";

const container = document.getElementById("app");

render(<Routes />, container);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }
