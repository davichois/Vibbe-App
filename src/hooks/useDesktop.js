import { useEffect, useState } from "react";

const useDesktop = (viewportNum = 768) => {
  const [esDesktop, setEsDesktop] = useState(null);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${viewportNum}px)`);

    const revisarSiEsMobil = () => {
      if (mql.matches) {
        setEsDesktop(true);
      } else {
        setEsDesktop(false);
      }
    };

    mql.addListener(revisarSiEsMobil);

    revisarSiEsMobil();

    return () => mql.removeListener(revisarSiEsMobil);
  }, []);

  return esDesktop;
};

export default useDesktop;
