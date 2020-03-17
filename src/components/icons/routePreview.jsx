import React from "react";
import polyline from "@mapbox/polyline";

const PreviewImg = coordinates => {
  const token =
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

  const reverseCo = coordinates.map(lngLat => lngLat.reverse());
  const newPolyline = polyline.encode(reverseCo);
  const lineSize = 2;
  const color = "00F"; // 3 or 6 digit hexa-decimal colours only

  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path-${lineSize}+${color}(${newPolyline})/auto/250x250?access_token=${token}`;

  return url;
};

export default PreviewImg;
