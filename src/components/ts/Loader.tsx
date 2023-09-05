import React from "react";
import loader from "../../assests/loader.gif";
import "../scss/Loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loader} alt="Loading..." />
    </div>
  );
};

export default Loader;
