import React from "react";
import Loader from "react-loader-spinner";

const LoadingIndicator = () => {
  return (
    <div>
      <Loader
        color="#DB504A"
        className="loader"
        type="Oval"
        height={100}
        width={100}
      />
    </div>
  );
};

export default LoadingIndicator;
