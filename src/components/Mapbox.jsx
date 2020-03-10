import React, { Component } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { point, distance } from "@turf/turf";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA"
});

const mapboxTerrainToken =
  "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

class Mapbox extends Component {
  state = {
    coordinates: [],
    calculatedDistance: 0,
    center: [-2.2426, 53.4808],
    zoom: [10],
    startEle: 0,
    endEle: 0,
    eleDiff: 0,
    currentDrawMode: null
  };
  render() {
    const {
      calculatedDistance,
      center,
      zoom,
      startEle,
      endEle,
      eleDiff
    } = this.state;
    const {
      onDrawCreate,
      onDrawUpdate,
      onDrawModeChange,
      onDrawSelectionChange,
      onDrawDelete,
      onClickMap
    } = this;
    return (
      <div className="map">
        <div>
          <ul>
            <li>Distance · {calculatedDistance.toFixed(2)} miles </li>
            <li>Starting Elevation · {startEle} meters</li>
            <li>End Elevation · {endEle} meters</li>
            <li>Elevation Diff · {eleDiff} meters</li>
          </ul>
        </div>
        <Map
          style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: "600px",
            width: "90vw"
          }}
          center={center}
          zoom={zoom}
          onClick={onClickMap}
        >
          <DrawControl
            onDrawCreate={onDrawCreate}
            onDrawUpdate={onDrawUpdate}
            onDrawModeChange={onDrawModeChange}
            onDrawSelectionChange={onDrawSelectionChange}
            onDrawDelete={onDrawDelete}
            styles={[
              // ACTIVE (being drawn)
              // line stroke

              {
                id: "gl-draw_point",
                type: "circle",
                filter: [
                  "all",
                  ["==", "$type", "Point"],
                  ["!=", "mode", "static"]
                ],
                paint: {
                  "circle-radius": 3,
                  "circle-color": "#D20C0C"
                }
              },
              {
                id: "gl-draw-line",
                type: "line",
                filter: [
                  "all",
                  ["==", "$type", "LineString"],
                  ["!=", "mode", "static"]
                ],
                layout: {
                  "line-cap": "round",
                  "line-join": "round"
                },
                paint: {
                  "line-color": "#D20C0C",
                  // "line-dasharray": [0.2, 2],
                  "line-width": 2
                }
              },
              // polygon fill
              {
                id: "gl-draw-polygon-fill",
                type: "fill",
                filter: [
                  "all",
                  ["==", "$type", "Polygon"],
                  ["!=", "mode", "static"]
                ],
                paint: {
                  "fill-color": "#D20C0C",
                  "fill-outline-color": "#D20C0C",
                  "fill-opacity": 0.1
                }
              },
              // polygon outline stroke
              // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
              {
                id: "gl-draw-polygon-stroke-active",
                type: "line",
                filter: [
                  "all",
                  ["==", "$type", "Polygon"],
                  ["!=", "mode", "static"]
                ],
                layout: {
                  "line-cap": "round",
                  "line-join": "round"
                },
                paint: {
                  "line-color": "#D20C0C",
                  "line-dasharray": [0.2, 2],
                  "line-width": 2
                }
              },
              // vertex point halos
              {
                id: "gl-draw-polygon-and-line-vertex-halo-active",
                type: "circle",
                filter: [
                  "all",
                  ["==", "meta", "vertex"],
                  ["==", "$type", "Point"],
                  ["!=", "mode", "static"]
                ],
                paint: {
                  "circle-radius": 5,
                  "circle-color": "#FFF"
                }
              },
              // vertex points
              {
                id: "gl-draw-polygon-and-line-vertex-active",
                type: "circle",
                filter: [
                  "all",
                  ["==", "meta", "vertex"],
                  ["==", "$type", "Point"],
                  ["!=", "mode", "static"]
                ],
                paint: {
                  "circle-radius": 3,
                  "circle-color": "#D20C0C"
                }
              },
              // INACTIVE (static, already drawn)
              // line stroke
              {
                id: "gl-draw-line-static",
                type: "line",
                filter: [
                  "all",
                  ["==", "$type", "LineString"],
                  ["==", "mode", "static"]
                ],
                layout: {
                  "line-cap": "round",
                  "line-join": "round"
                },
                paint: {
                  "line-color": "#000",
                  "line-width": 3
                }
              },
              // polygon fill
              {
                id: "gl-draw-polygon-fill-static",
                type: "fill",
                filter: [
                  "all",
                  ["==", "$type", "Polygon"],
                  ["==", "mode", "static"]
                ],
                paint: {
                  "fill-color": "#000",
                  "fill-outline-color": "#000",
                  "fill-opacity": 0.1
                }
              },
              // polygon outline
              {
                id: "gl-draw-polygon-stroke-static",
                type: "line",
                filter: [
                  "all",
                  ["==", "$type", "Polygon"],
                  ["==", "mode", "static"]
                ],
                layout: {
                  "line-cap": "round",
                  "line-join": "round"
                },
                paint: {
                  "line-color": "#000",
                  "line-width": 3
                }
              }
            ]}
          />
        </Map>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentDrawMode } = this.state;
    if (
      prevState.currentDrawMode !== currentDrawMode &&
      currentDrawMode === "draw_line_string"
    ) {
      this.setState({ calculatedDistance: 0 });
    }
  }

  onDrawModeChange = e => {
    this.setState({ currentDrawMode: e.mode });
  };

  onClickMap = (map, event) => {
    const { currentDrawMode } = this.state;
    const { calculateDistance, calculateElevation } = this;
    event.preventDefault();
    if (currentDrawMode === "draw_line_string") {
      const { lng, lat } = event.lngLat;
      const selectedCo = [lng, lat];
      this.setState(
        prevState => {
          const prevCo = prevState.coordinates;
          const newCo = { coordinates: [...prevCo, selectedCo] };
          return newCo;
        },
        () => {
          calculateDistance();
          calculateElevation();
        }
      );
    }
  };

  calculateDistance = () => {
    const { calculatedDistance, coordinates } = this.state;
    if (coordinates.length > 1) {
      const length = coordinates.length;
      const from = point(coordinates[length - 2]);
      const to = point(coordinates[length - 1]);
      const currentDist = calculatedDistance;
      const newDist = distance(from, to);
      this.setState({ calculatedDistance: currentDist + newDist });
    }
  };

  calculateElevation = () => {
    const { coordinates, startEle } = this.state;
    const { length } = coordinates;
    const start = coordinates[0];
    const end = coordinates[length - 1];

    let lng = start[0];
    let lat = start[1];

    if (length > 1) {
      lng = end[0];
      lat = end[1];
    }

    axios
      .get(
        `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=50&access_token=${mapboxTerrainToken}`
      )
      .then(({ data: { features } }) => {
        const elevations = [];

        features.forEach(feature => {
          const { ele } = feature.properties;
          elevations.push(ele);
        });

        const maxEle = Math.max(...elevations);

        if (length <= 1) {
          this.setState({ startEle: maxEle });
        } else {
          this.setState({ endEle: maxEle, eleDiff: startEle - maxEle });
        }
      });
  };

  onDrawCreate = ({ features }) => {
    console.log(features);
    this.setState({ coordinates: [] });
  };

  // onDrawUpdate = ({ features }) => {
  //   console.log("Update");
  // };

  onDrawSelectionChange = ({ features }) => {
    const { currentDrawMode } = this.state;
    if (!features.length && currentDrawMode === "draw_line_string") {
      this.setState({ calculatedDistance: 0 });
    }
  };

  onDrawDelete = e => {
    this.setState({ calculatedDistance: 0 });
  };
}
export default Mapbox;
