import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
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
import { navigate } from "@reach/router";
import attractionFlag from "./icons/orange_marker.png";
import warningFlag from "./icons/orange_flag.png";
import foodFlag from "./icons/foodicon.png";
import { mapStyles } from "./styling/map.styles";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA"
});

const mapboxTerrainToken =
  "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

class Mapbox extends Component {
  state = {
    coordinates: [],
    calculatedDistance: +localStorage.calculatedDistance || 0,
    drawCenter: [],
    center: [],
    zoom: [12],
    startEle: localStorage.startEle || 0,
    endEle: localStorage.endEle || 0,
    CEG: localStorage.CEG || 0,
    allEle: [],
    currentDrawMode: null,
    features: localStorage.features ? JSON.parse(localStorage.features) : [],
    isLoading: true,
    selectedMarker: null,
    markerInfo: "",
    routeName: localStorage.routeName || "",
    markerType: "attraction",
    routeType: localStorage.routeType || "scenic",
    routeDescription: localStorage.routeDescription || "",
    err: false,
    formError: false,
    drawError: false
  };
  render() {
    const {
      calculatedDistance,
      center,
      zoom,
      startEle,
      endEle,
      CEG,
      isLoading,
      selectedMarker,
      markerInfo,
      err,
      formError,
      drawError,
      routeDescription,
      routeName,
      routeType,
      features,
      drawCenter
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
      setMarkerType,
      setSelectedMarker,
      closePopup
    } = this;

    return (
      <div className={styles.map_block}>
        {isLoading ? (
          <section className={styles.loading_section}>
            <img src={bike_spinner} alt="loading" />
          </section>
        ) : localStorage.features ? (
          <Map
            style="mapbox://styles/mapbox/streets-v11" // eslint-disable-line
            containerStyle={{
              height: "100%",
              width: "90vw"
            }}
            center={drawCenter}
            zoom={zoom}
          >
            {features.map(feature => {
              if (feature.geometry.type === "LineString") {
                return (
                  <Layer
                    type="line"
                    id="route"
                    key={feature.id}
                    paint={{ "line-width": 3, "line-color": "#2F3288" }}
                  >
                    <Feature coordinates={feature.geometry.coordinates} />
                  </Layer>
                );
              } else if (feature.geometry.type === "Point") {
                let markerImage;
                if (feature.markerType === "attraction") {
                  markerImage = attractionFlag;
                } else if (feature.markerType === "food") {
                  markerImage = foodFlag;
                } else {
                  markerImage = warningFlag;
                }
                return (
                  <Marker
                    coordinates={feature.geometry.coordinates}
                    key={feature.id}
                  >
                    <img
                      alt="pin marker"
                      src={markerImage}
                      height="30px"
                      onClick={() => {
                        setSelectedMarker(feature);
                      }}
                    />
                  </Marker>
                );
              }
            })}
            {selectedMarker && (
              <Popup
                coordinates={selectedMarker.geometry.coordinates}
                onClick={closePopup}
              >
                <p>{selectedMarker.markerComments[0]}</p>
              </Popup>
            )}
          </Map>
        ) : (
          <Map
            style="mapbox://styles/mapbox/streets-v11" // eslint-disable-line
            containerStyle={{
              height: "100%",
              width: "100%"
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
              displayControlsDefault={false}
              controls={{ line_string: true, trash: true, point: true }}
              styles={mapStyles}
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
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title>
              <h2 className={styles.h2}>Create a new route</h2>
            </Card.Title>
            <Card.Subtitle className={styles.subtitle}>
              Draw your route using the tools at the left of the map. You can
              drop pins for any warnings or attractions along the route. Once
              you're happy with your route click save!
            </Card.Subtitle>
            <br></br>
            <Card.Text className={styles.route_stats}>
              <b>Distance</b> · {calculatedDistance.toFixed(2)} miles <br></br>
              <b>Starting Elevation</b> · {startEle} meters <br></br>
              <b>End Elevation</b> · {endEle} meters <br></br>
              <b>CEG</b> · {CEG} meters
              <br></br>
            </Card.Text>
            <Form onSubmit={this.handleSaveRoute}>
              <Form.Group
                className={styles.input_label}
                controlId="drawRouteForm.ControlSelect1"
              >
                <Form.Label className={styles.form_label}>
                  Route type
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleRouteTypeChange}
                  className={styles.placeholder}
                  value={routeType}
                >
                  <option value="scenic">Scenic</option>
                  <option value="family friendly">Family Friendly</option>
                  <option value="off-road">Off-Road</option>
                  <option value="training">Training</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                className={styles.input_label}
                controlId="drawRouteForm.ControlTextArea1"
              >
                <Form.Label className={styles.form_label}>
                  Route name
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="eg. West Didsbury to Chorlton"
                  onChange={this.handleRouteNameChange}
                  className={styles.placeholder}
                  value={routeName}
                />
              </Form.Group>
              <Form.Group
                className={styles.input_label}
                controlId="drawRouteForm.ControlTextArea2"
              >
                <Form.Label className={styles.form_label}>
                  Route description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  placeholder="Tell us a little about your route"
                  onChange={this.handleRouteDescriptionChange}
                  value={routeDescription}
                  className={styles.placeholder}
                />
              </Form.Group>
              {localStorage.features && (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleDrawNewRoute}
                  className={styles.saveButton}
                >
                  Draw a new route
                </Button>
              )}
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSaveRoute}
                className={styles.saveButton}
                disabled={err}
              >
                Save your route
              </Button>
              {err && <p>You must be logged in to post!</p>}
              {formError && <p>Please input a route name and description</p>}
              {drawError && <p>Dont forget to draw your route!</p>}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    this.getCurrentLocation();
    if (localStorage.features) {
      const { length } = JSON.parse(
        localStorage.features
      )[0].geometry.coordinates;

      this.setState({
        zoom:
          localStorage.calculatedDistance === 0
            ? [12]
            : localStorage.calculatedDistance < 1
            ? [15.5]
            : localStorage.calculatedDistance < 2
            ? [14]
            : localStorage.calculatedDistance < 3
            ? [13.5]
            : localStorage.calculatedDistance < 7
            ? [12]
            : localStorage.calculatedDistance < 10
            ? [11]
            : [10],
        drawCenter: JSON.parse(localStorage.features)[0].geometry.coordinates[
          Math.round(length / 2)
        ]
      });
    }
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
        CEG: 0,
        allEle: []
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
      this.setState({ center: [-2.2243669, 53.4672013], isLoading: false });
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
    this.setState({ markerType: "attraction" });
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
    const { coordinates } = this.state;
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

        const ele = Math.max(...elevations);

        if (length <= 1) {
          this.setState({
            startEle: ele,
            CEG: 0,
            endEle: ele,
            allEle: [ele]
          });
        } else {
          this.setState(prevState => {
            const CEG =
              ele > prevState.endEle
                ? prevState.CEG + ele - prevState.endEle
                : prevState.CEG;

            return { endEle: ele, CEG, allEle: [...prevState.allEle, ele] };
          });
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
      selectedMarker: null,
      features: newFeatures
    });
  };

  handleDrawNewRoute = e => {
    e.preventDefault();
    localStorage.removeItem("features");
    localStorage.removeItem("routeName");
    localStorage.removeItem("routeType");
    localStorage.removeItem("routeDescription");
    localStorage.removeItem("calculatedDistance");
    localStorage.removeItem("startEle");
    localStorage.removeItem("endEle");
    localStorage.removeItem("CEG");
    this.setState({
      features: [],
      routeDescription: "",
      routeName: "",
      routeType: "scenic",
      selectedMarker: null,
      err: false,
      calculatedDistance: 0,
      zoom: [10],
      startEle: 0,
      endEle: 0,
      CEG: 0
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
      routeDescription,
      startEle,
      endEle,
      CEG
    } = this.state;

    if (features.length === 0) {
      this.setState({ drawError: true });
    } else if (routeName.length === 0 || routeDescription.length === 0) {
      this.setState({ formError: true, drawError: false });
    } else {
      api
        .getRouteCity(features[0].geometry.coordinates[0])
        .then(city => {
          return api.postRoute(
            routeName,
            routeType,
            features,
            calculatedDistance,
            center,
            zoom,
            city,
            routeDescription
          );
        })
        .then(route => {
          if (route.data) {
            navigate(`/routes/id/${route.data.route._id}`);
          }
        })
        .catch(err => {
          this.setState({ err: true, formError: false, drawError: false });
          localStorage.setItem("features", JSON.stringify(features));
          localStorage.setItem("routeType", routeType);
          localStorage.setItem("routeName", routeName);
          localStorage.setItem("routeDescription", routeDescription);
          localStorage.setItem("calculatedDistance", calculatedDistance);
          localStorage.setItem("startEle", startEle);
          localStorage.setItem("endEle", endEle);
          localStorage.setItem("CEG", CEG);
        });
    }
  };

  setSelectedMarker = feature => {
    this.setState({ selectedMarker: feature });
  };

  closePopup = () => {
    this.setState({ selectedMarker: null });
  };

  handleRouteTypeChange = e => {
    this.setState({ routeType: e.target.value });
  };

  handleRouteNameChange = e => {
    this.setState({ routeName: e.target.value });
  };

  handleRouteDescriptionChange = e => {
    this.setState({ routeDescription: e.target.value });
  };

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
        features: newFeatures,
        markerType: "attraction"
      };
    });
  };

  handleMarkerFormChange = e => {
    this.setState({ markerInfo: e.target.value });
  };
}
export default Mapbox;
