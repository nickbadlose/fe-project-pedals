import React, { Component } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { point, distance } from "@turf/turf";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA"
});
class Mapbox extends Component {
  state = {
    selected: { coordinates: [] },
    calculatedDistance: 0,
    coordinates: [],
    center: [-2.2426, 53.4808],
    zoom: [10],
    currentDrawMode: null
  };
  render() {
    const { calculatedDistance, center, zoom } = this.state;
    const {
      onDrawCreate,
      onDrawUpdate,
      onDrawModeChange,
      onDrawSelectionChange,
      onDrawDelete,
      onClickMap,
      handleButtonClick
    } = this;
    return (
      <div className="map">
        <div>
          {calculatedDistance}{" "}
          <button onClick={handleButtonClick}>Reset</button>
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
    if (
      prevState.currentDrawMode !== this.state.currentDrawMode &&
      this.state.currentDrawMode === "draw_line_string"
    ) {
      this.setState({ calculatedDistance: 0 });
    }
  }

  onDrawModeChange = e => {
    this.setState({ currentDrawMode: e.mode });
  };

  onClickMap = (map, event) => {
    event.preventDefault();
    if (this.state.currentDrawMode === "draw_line_string") {
      const { lng, lat } = event.lngLat;
      const selectedCo = [lng, lat];
      this.setState(
        prevState => {
          const prevCo = prevState.selected.coordinates;
          const newCo = { selected: { coordinates: [...prevCo, selectedCo] } };
          return newCo;
        },
        () => {
          this.calculateDistance();
        }
      );
    }
  };

  handleButtonClick = event => {
    this.setState({ calculatedDistance: 0 });
  };

  calculateDistance = () => {
    const { calculatedDistance } = this.state;

    const { coordinates } = this.state.selected;
    if (coordinates.length > 1) {
      const length = coordinates.length;
      const from = point(coordinates[length - 2]);
      const to = point(coordinates[length - 1]);
      const currentDist = calculatedDistance;
      const newDist = distance(from, to);
      this.setState({ calculatedDistance: currentDist + newDist });
    }
  };

  onDrawCreate = ({ features }) => {
    const { coordinates, type } = features[0].geometry;
    this.setState(currentState => {
      return {
        ...currentState,
        coordinates,
        type,
        selected: { coordinates: [] }
      };
    });
  };

  // onDrawUpdate = ({ features }) => {
  //   console.log("Update");
  // };

  onDrawSelectionChange = ({ features }) => {
    console.dir(features);
    console.log("selectionChange");
    if (!features.length && this.state.currentDrawMode === "draw_line_string") {
      this.setState({ calculatedDistance: 0 });
    }
  };

  onDrawDelete = e => {
    this.setState({ calculatedDistance: 0 });
    console.dir(e);
  };
}
export default Mapbox;
