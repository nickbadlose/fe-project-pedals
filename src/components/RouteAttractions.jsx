import React from "react";

const RouteAttractions = props => {
  const { features } = props;

  const attractions = features.filter(feature => {
    return feature.markerType === "attraction";
  });
  console.log(attractions);
  const warnings = features.filter(feature => {
    return feature.markerType === "warning";
  });
  return (
    <div>
      <h2>Attractions</h2>
      <ul>
        {attractions.map(attraction => {
          return <li key={attraction.id}>{attraction.markerComments[0]}</li>;
        })}
      </ul>
      <h2>Warnings</h2>
      <ul>
        {warnings.map(warning => {
          return <li key={warning.id}>{warning.markerComments[0]}</li>;
        })}
      </ul>
    </div>
  );
};

export default RouteAttractions;
