import React, { Component } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { point, distance } from "@turf/turf";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
import DrawPopup from "./DrawPopup";
import styles from "./styling/Mapbox.module.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bike_spinner from "./icons/bike_spinner.gif";
import * as api from "../api.js";
import { navigate } from '@reach/router';

 

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
    center: [],
    zoom: [10],
    startEle: 0,
    endEle: 0,
    eleDiff: 0,
    currentDrawMode: null,
    features: [],
    isLoading: true,
    selectedMarker: null,
    markerInfo: "",
    routeName: "",
    markerType: "attraction",
    routeType: "scenic",
    routeDescription: ""
  };
  render() {
    const {
      calculatedDistance,
      center,
      zoom,
      startEle,
      endEle,
      eleDiff,
      isLoading,
      selectedMarker,
      markerInfo
    } = this.state;
    const {
      onDrawCreate,
      onDrawUpdate,
      onDrawModeChange,
      onDrawSelectionChange,
      onDrawDelete,
      onClickMap,
      handleMarkerForm,
      handleMarkerFormChange,
      setMarkerType
    } = this;
    return (
      <div className={styles.map_block}>
        {isLoading ? (
          <section className={styles.loading_section}>
            <img src={bike_spinner} alt="loading" />
          </section>
        ) : (
          <Map
            style="mapbox://styles/mapbox/streets-v11" // eslint-disable-line
            containerStyle={{
              height: "50em",
              width: "150em"
            }}
            center={center}
            zoom={zoom}
            onClick={onClickMap}>
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
            <DrawPopup
              selectedMarker={selectedMarker}
              handleMarkerForm={handleMarkerForm}
              handleMarkerFormChange={handleMarkerFormChange}
              markerInfo={markerInfo}
              setMarkerType={setMarkerType}
            />
          </Map>
        )}
        <Card>
          <Card.Body>
            <Card.Title>
              <h2>Create a new route</h2>
            </Card.Title>
            <br></br>
            <Card.Subtitle className="mb-2 text-muted">
              Draw your route using the tools at the left of the map. You can
              drop pins for any warnings or attractions along the route. Once
              you're happy with your route click save!
            </Card.Subtitle>
            <br></br>
            <Card.Text>
              Distance · {calculatedDistance.toFixed(2)} miles <br></br>
              Starting Elevation · {startEle} meters <br></br>
              End Elevation · {endEle} meters <br></br>
              Elevation Diff · {eleDiff} meters
              <br></br>
              <br></br>
            </Card.Text>
            <Form>
              <Form.Group
                className={styles.input_label}
                controlId="drawRouteForm.ControlSelect1">
                <Form.Label>Route type</Form.Label>
                <Form.Control as="select" onChange={this.handleRouteTypeChange}>
                  <option value="scenic">Scenic</option>
                  <option value="family friendly">Family Friendly</option>
                  <option value="off-road">Off-Road</option>
                  <option value="training">Training</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                className={styles.input_label}
                controlId="drawRouteForm.ControlTextArea1">
                <Form.Label>Route name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="eg. West Didsbury to Chorlton" onChange={this.handleRouteNameChange}></Form.Control>
              </Form.Group>
              <Form.Group
                className={styles.input_label}
                controlId="drawRouteForm.ControlTextArea2">
                <Form.Label>Route description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  placeholder="Tell us a little about your route" onChange={this.handleRouteDescriptionChange}></Form.Control>
              </Form.Group>
              <br></br>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSaveRoute}>
                Save your route!
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentDrawMode } = this.state;
    if (
      prevState.currentDrawMode !== currentDrawMode &&
      currentDrawMode === "draw_line_string"
    ) {
      this.setState({
        calculatedDistance: 0,
        startEle: 0,
        endEle: 0,
        eleDiff: 0
      });
    }
  }

  setMarkerType = e => {
    this.setState({ markerType: e.target.value });
  };

  handleRouteNameInput = e => {
    this.setState({ routeName: e.target.value });
  };

  getCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = pos => {
      let { latitude, longitude } = pos.coords;
      let currentCoordinates = [longitude, latitude];
      this.setState({ center: currentCoordinates, isLoading: false });
    };

    const error = err => {
      console.log(err);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

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
    const { currentDrawMode } = this.state;
    if (currentDrawMode === "draw_line_string") {
      this.setState(currentState => {
        return { features: [...currentState.features, features[0]] };
      });
    }
    if (currentDrawMode === "draw_point") {
      this.setState(currentState => {
        const pointFeatures = { ...features[0], markerComments: [] };
        return { features: [...currentState.features, pointFeatures] };
      });
    }
  };

  // onDrawUpdate = ({ features }) => {
  //   console.log("Update");
  // };

  onDrawSelectionChange = ({ features }) => {
    const { currentDrawMode } = this.state;
    if (features.length) {
      if (features[0].geometry.type === "Point") {
        // if the selected feature is a point and exists in the features array in state, add the current comment input to the comments for that selected input. This is so that we display the comments once they are input.
        const selectedFeature = this.state.features.filter(feature => {
          if (feature.id === features[0].id) {
            return feature;
          }
        });
        const comments = selectedFeature[0].markerComments;
        this.setState({
          selectedMarker: { ...features[0], comments },
          markerInfo: ""
        });
      }
    }
    if (!features.length && currentDrawMode === "draw_line_string") {
      this.setState({ calculatedDistance: 0 });
    } else if (!features.length && currentDrawMode === "simple_select")
      this.setState({ selectedMarker: null });
  };

  onDrawDelete = e => {
    //executed when delete button is clicked. Taking the selected feature and removing it from the features array, resetting the count for distance and elevation and resetting the selected marker so it no longer displays a deleted marker.
    const { features } = this.state;

    const newFeatures = features.filter(feature => {
      if (e.features[0].id !== feature.id) {
        return feature;
      }
    });

    this.setState({
      calculatedDistance: 0,
      startEle: 0,
      endEle: 0,
      eleDiff: 0,
      selectedMarker: null,
      features: newFeatures
    });
  };

  handleSaveRoute = e => {
    e.preventDefault();
    const {
      routeName,
      routeType,
      features,
      calculatedDistance,
      center,
      zoom,
      routeDescription
    } = this.state;

    const city = "Manchester";

    api.postRoute(routeName, routeType, features, calculatedDistance, center, zoom, city, routeDescription).then(route => 
      navigate(`/routes/${route.data.route._id}`))
    
  };

  handleRouteTypeChange = e => {
    this.setState({ routeType: e.target.value });
  };

  handleRouteNameChange = (e) => {
    this.setState({routeName: e.target.value})
  }

  handleRouteDescriptionChange = (e) => {
    this.setState({routeDescription: e.target.value})

  }

  handleMarkerForm = e => {
    const { features, selectedMarker, markerInfo, markerType } = this.state;
    e.preventDefault();
    const newFeatures = features.map(feature => {
      if (feature.id === selectedMarker.id) {
        return {
          ...feature,
          markerComments: [markerInfo],
          markerType
        };
      } else return feature;
    });
    this.setState(currentState => {
      // adding the comments to features array so that it is stored, and also to the selected marker so that it is displayed on screen
      return {
        selectedMarker: {
          ...currentState.selectedMarker,
          comments: [markerInfo]
        },
        features: newFeatures
      };
    });
  };

  handleMarkerFormChange = e => {
    this.setState({ markerInfo: e.target.value });
  };
}
export default Mapbox;
