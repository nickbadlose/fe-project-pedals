import React from "react";
import AllRoutes from "./AllRoutes";
import styles from "../styling/RouteType.module.css";

const RouteType = ({ type }) => {
  return (
    <main>
      <h2 className={styles.h2}>{type.charAt(0).toUpperCase() + type.slice(1)} Routes</h2>
      <AllRoutes type={type} />
    </main>
  );
};

export default RouteType;
