import React from "react";
import orange_flag from "../icons/orange_flag.png";
import orange_marker from "../icons/orange_marker.png";
import styles from "../styling/RouteAttractions.module.css";

const RouteAttractions = props => {
  const { features } = props;

  const attractions = features.filter(feature => {
    return feature.markerType === "attraction";
  });

  const warnings = features.filter(feature => {
    return feature.markerType === "warning";
  });
  return (
    <section>
      <h2 className={styles.heading}>
        <img
          alt="attraction marker"
          src={orange_marker}
          height="40"
          width="40"
        ></img>
        {"  "}Attractions
      </h2>
      <ul>
        {attractions.map(attraction => {
          return (
            <li key={attraction.id} className={styles.attractions}>
              {attraction.markerComments[0]}
            </li>
          );
        })}
      </ul>
      <br></br>
      <h2 className={styles.heading}>
        <img alt="warning flag" src={orange_flag} height="30" width="30"></img>
        {"  "}Warnings
      </h2>
      <ul>
        {warnings.map(warning => {
          return (
            <li key={warning.id} className={styles.warnings}>
              {warning.markerComments[0]}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RouteAttractions;
