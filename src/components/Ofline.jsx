import React, { useState, useEffect } from "react";

const Ofline = () => {
  const [onLine, setOnLine] = useState(navigator ? navigator.onLine : true);

  useEffect(() => {
    if (!window) return;
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  });

  const goOnline = () => setOnLine(true);
  const goOffline = () => setOnLine(false);

  return () => {
    if (onLine) {
      return null;
    } else {
      return <span>Sin Conexión</span>;
    }
  };
};

export default Ofline;
