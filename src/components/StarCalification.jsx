import React from "react";

const StarCalification = ({ value }) => {
  let starOne = `icon-star ${value >= 1 ? "active" : ""}`;
  let starTwo = `icon-star ${value >= 2 ? "active" : ""}`;
  let starThree = `icon-star ${value >= 3 ? "active" : ""}`;
  let starFour = `icon-star ${value >= 4 ? "active" : ""}`;
  let starFive = `icon-star ${value >= 5 ? "active" : ""}`;

  return (
    <div className="iconsCalification">
      <span className={starOne}></span>
      <span className={starTwo}></span>
      <span className={starThree}></span>
      <span className={starFour}></span>
      <span className={starFive}></span>
    </div>
  );
};

export default StarCalification;
