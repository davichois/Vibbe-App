const desfactor = (num) => {
  let millones = Math.floor(num / 1000000);
  let millas = Math.floor((num % 1000000) / 1000);
  let centenas = Math.floor(num % 1000);
  let print;

  if (num <= 999) {
    return (print = `${centenas}`);
  } else {
    centenas = centenas < 10 ? `0${centenas}` : centenas;
    centenas = centenas < 100 ? `0${centenas}` : centenas;
    if (num <= 999999) {
      return (print = `${millas},${centenas}`);
    } else {
      millas = millas < 10 ? `0${millas}` : millas;
      millas = millas < 100 ? `0${millas}` : millas;
      return (print = `${millones},${millas},${centenas}`);
    }
  }
};

export default desfactor;
