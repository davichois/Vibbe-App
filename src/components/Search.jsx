import React from "react";

import "../sass/components/Search.scss";

const Search = ({ onChange, value }) => {
  return (
    <div className="search">
      <i className="icon-gps"></i>
      <input
        type="text"
        placeholder="Busca tu Pais"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
