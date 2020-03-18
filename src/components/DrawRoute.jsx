import React, { Component } from "react";
import Mapbox from "./Mapbox";
import styles from "../components/styling/DrawRoute.module.css";

class DrawRoute extends Component {
  render() {
    return (
      <div className={styles.pageContainer}>
        <Mapbox />
      </div>
    );
  }
}

export default DrawRoute;
