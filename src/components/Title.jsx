import React from "react";

const Title = ({ title, subtitle, img }) => {
  return (
    <div className="titleInfo">
      <img src={img} alt="ImgProgress" />
      <div>
        <span>{title}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

export default Title;
