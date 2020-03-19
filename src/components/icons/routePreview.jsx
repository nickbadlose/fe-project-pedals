import React from "react";
import polyline from "@mapbox/polyline";

const PreviewImg = coordinates => {
  const token =
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

  let coordinatesArr = coordinates;

  if (coordinates[0][0] < coordinates[0][1]) {
    coordinatesArr = coordinates.map(lngLat => lngLat.reverse());
  }
  const newPolyline = polyline.encode(coordinatesArr);
  const encodedPolyline = encodeURIComponent(newPolyline);
  const lineSize = 3;
  const color = "00F"; // 3 or 6 digit hexa-decimal colours only

  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path-${lineSize}+${color}(${encodedPolyline})/auto/400x400?access_token=${token}`;

  return url;
};

export default PreviewImg;
