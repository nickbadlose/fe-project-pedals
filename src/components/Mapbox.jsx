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
    distance: 0,
    coordinates: [],
    mode: null,
    center: [-2.2426, 53.4808],
    zoom: [10],
    currentMode: null
  };
  render() {
    const { distance, center, zoom } = this.state;
    return (
      <div className="map">
        <div>
          {this.state.distance}{" "}
          <button onClick={this.handleButtonClick}>Reset</button>
        </div>
        <Map
          style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: "600px",
            width: "90vw"
          }}
          center={this.state.center}
          zoom={this.state.zoom}
          onClick={this.onClickMap}
        >
          <DrawControl
            onDrawCreate={this.onDrawCreate}
            onDrawUpdate={this.onDrawUpdate}
            onDrawModeChange={this.onDrawModeChange}
            onDrawActionable={this.onDrawActionable}
            onDrawRender={this.onDrawRender}
            onDrawSelectionChange={this.onDrawSelectionChange}
            onDrawDelete={this.onDrawDelete}
            // styles={
            //   [
            // ACTIVE (being drawn)
            // line stroke
            // {
            //   id: "gl-draw-line",
            //   type: "line",
            //   filter: [
            //     "all",
            //     ["==", "$type", "LineString"],
            //     ["!=", "mode", "static"]
            //   ],
            //   layout: {
            //     "line-cap": "round",
            //     "line-join": "round"
            //   },
            //   paint: {
            //     "line-color": "#D20C0C",
            //     "line-dasharray": [0.2, 2],
            //     "line-width": 2
            //   }
            // }
            // polygon fill
            // {
            //   id: "gl-draw-polygon-fill",
            //   type: "fill",
            //   filter: [
            //     "all",
            //     ["==", "$type", "Polygon"],
            //     ["!=", "mode", "static"]
            //   ],
            //   paint: {
            //     "fill-color": "#D20C0C",
            //     "fill-outline-color": "#D20C0C",
            //     "fill-opacity": 0.1
            //   }
            // },
            // // polygon outline stroke
            // // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
            // {
            //   id: "gl-draw-polygon-stroke-active",
            //   type: "line",
            //   filter: [
            //     "all",
            //     ["==", "$type", "Polygon"],
            //     ["!=", "mode", "static"]
            //   ],
            //   layout: {
            //     "line-cap": "round",
            //     "line-join": "round"
            //   },
            //   paint: {
            //     "line-color": "#D20C0C",
            //     "line-dasharray": [0.2, 2],
            //     "line-width": 2
            //   }
            // },
            // // vertex point halos
            // // {
            // //   id: "gl-draw-polygon-and-line-vertex-halo-active",
            // //   type: "circle",
            // //   filter: [
            // //     "all",
            // //     ["==", "meta", "vertex"],
            // //     ["==", "$type", "Point"],
            // //     ["!=", "mode", "static"]
            // //   ],
            // //   paint: {
            // //     "circle-radius": 5,
            // //     "circle-color": "#FFF"
            // //   }
            // // },
            // // vertex points
            // // {
            // //   id: "gl-draw-polygon-and-line-vertex-active",
            // //   type: "circle",
            // //   filter: [
            // //     "all",
            // //     ["==", "meta", "vertex"],
            // //     ["==", "$type", "Point"],
            // //     ["!=", "mode", "static"]
            // //   ],
            // //   paint: {
            // //     "circle-radius": 3,
            // //     "circle-color": "#D20C0C"
            // //   }
            // // },
            // // INACTIVE (static, already drawn)
            // // line stroke
            // {
            //   id: "gl-draw-line-static",
            //   type: "line",
            //   filter: [
            //     "all",
            //     ["==", "$type", "LineString"],
            //     ["==", "mode", "static"]
            //   ],
            //   layout: {
            //     "line-cap": "round",
            //     "line-join": "round"
            //   },
            //   paint: {
            //     "line-color": "#000",
            //     "line-width": 3
            //   }
            // },
            // // polygon fill
            // {
            //   id: "gl-draw-polygon-fill-static",
            //   type: "fill",
            //   filter: [
            //     "all",
            //     ["==", "$type", "Polygon"],
            //     ["==", "mode", "static"]
            //   ],
            //   paint: {
            //     "fill-color": "#000",
            //     "fill-outline-color": "#000",
            //     "fill-opacity": 0.1
            //   }
            // },
            // // polygon outline
            // {
            //   id: "gl-draw-polygon-stroke-static",
            //   type: "line",
            //   filter: [
            //     "all",
            //     ["==", "$type", "Polygon"],
            //     ["==", "mode", "static"]
            //   ],
            //   layout: {
            //     "line-cap": "round",
            //     "line-join": "round"
            //   },
            //   paint: {
            //     "line-color": "#000",
            //     "line-width": 3
            //   }
            // }
            // ]
            // }
          />
        </Map>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentMode !== this.state.currentMode &&
      this.state.currentMode === "draw_line_string"
    ) {
      this.setState({ distance: 0 });
    }
  }

  onDrawModeChange = e => {
    // console.log(e.mode, "<<");
    // console.log("modeChange");
    this.setState({ currentMode: e.mode });
    if (e.mode === "simple_select" || e.mode === "draw_point")
      this.setState({ mode: null });
    else if (e.mode === "draw_line_string")
      this.setState({ mode: "drawLineString" });
  };
  onClickMap = (map, event) => {
    event.preventDefault();
    if (this.state.mode === "drawLineString") {
      // console.log(event.lngLat, "***");
      const { lng, lat } = event.lngLat;
      const selectedCo = [lng, lat];
      this.setState(
        prevState => {
          const prevCo = prevState.selected.coordinates;
          const newCo = { selected: { coordinates: [...prevCo, selectedCo] } };
          return newCo;
        },
        () => {
          this.distance();
        }
      );
    }
  };
  handleButtonClick = event => {
    this.setState({ distance: 0 });
  };
  distance = () => {
    const { coordinates } = this.state.selected;
    if (coordinates.length > 1) {
      const length = coordinates.length;
      const from = point(coordinates[length - 2]);
      const to = point(coordinates[length - 1]);
      const currentDist = this.state.distance;
      const newDist = distance(from, to);
      this.setState({ distance: currentDist + newDist }, () => {
        // console.log(this.state.distance, "***");
      });
    }
  };
  onDrawCreate = ({ features }) => {
    const { coordinates, type } = features[0].geometry;
    this.setState({ coordinates, type, mode: null }, () => {});
    console.dir(this.state.coordinates, features);
    console.log("create");
  };
  onDrawUpdate = ({ features }) => {
    // console.log("Update");
  };

  // onDrawActionable = e => {
  //   console.log("drawActionable");
  //   // console.dir(e);
  // };
  // onDrawRender = ({ features }) => {
  //   console.log("drawRender");
  // };
  onDrawSelectionChange = ({ features }) => {
    console.dir(features);
    console.log("selectionChange");
    if (!features.length && this.state.mode === "drawLineString") {
      this.setState({ distance: 0 });
    }
  };

  onDrawDelete = e => {
    this.setState({ distance: 0 });
    console.dir(e);
  };
}
export default Mapbox;
