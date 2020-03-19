import React, { Component } from "react";
import Directions from "../Directions";
import AllReviews from "../Reviews/AllReviews";
import Card from "react-bootstrap/Card";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import RouteAttractions from "./RouteAttractions";
import attractionFlag from "../icons/location-pin.png";
import warningFlag from "../icons/warning-flag.png";
import bike_spinner from "../icons/bike_spinner.gif";
import styles from "../styling/SingleRoute.module.css";
import axios from "axios";
import * as api from "../../api";
import { navigate } from "@reach/router";
import * as utils from "../../utils/utils";

const token =
  "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA"
});

class SingleRoute extends Component {
  state = {
    route: {},
    isLoading: true,
    reviews: [],
    coordinates: [],
    user: {},
    disableButton: false,
    rating: 0,
    deleteErr: false
  };

  render() {
    const {
      features,
      selectedMarker,
      routeName,
      calculatedDistance,
      city,
      user_id,
      type
    } = this.state.route;
    const { disableButton, deleteErr } = this.state;
    const { saveRoute, closePopup, setSelectedMarker, deleteRoute } = this;

    const { reviews, rating } = this.state;

    let center;
    let zoom = [15];
    if (features) {
      const { length } = features[0].geometry.coordinates;
      center = features[0].geometry.coordinates[Math.round(length / 2)];
    }
    if (calculatedDistance > 4) zoom = [11];

    return this.state.isLoading ? (
      <div className={styles.map_block}>
        <div className={styles.loading_section}>
          <img src={bike_spinner} alt="loading" />
        </div>
      </div>
    ) : (
      <div>
        <div className={styles.map_block}>
          <Map
            style="mapbox://styles/mapbox/streets-v11" // eslint-disable-line
            containerStyle={{
              height: "100%",
              width: "90vw"
            }}
            center={center}
            zoom={zoom}
          >
            {features.map(feature => {
              if (
                feature.geometry.type === "LineString" ||
                feature.type === "LineString"
              ) {
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
          <Card className={styles.stats_card}>
            <Card.Body>
              <Card.Title>
                <h2 className={styles.h2}>{routeName}</h2>
              </Card.Title>
              <br></br>
              <Card.Subtitle className={styles.route_stats}>
                <b>Location</b> · {city}
                <br></br>
                <b>Distance</b> · {calculatedDistance.toFixed(2)} miles
                <br></br> <b>Route Type</b> · {type}
                <br></br>
                <b>Rating</b> · {rating} / 5<br></br>
                <b>Posted by</b> · {user_id}
              </Card.Subtitle>

              <Card.Body>
                {disableButton ? (
                  <button
                    className={styles.save_button}
                    onClick={saveRoute}
                    disabled
                  >
                    Route saved
                  </button>
                ) : (
                  <button className={styles.save_button} onClick={saveRoute}>
                    Save Route
                  </button>
                )}
                <br></br>
                <br></br>
                <RouteAttractions features={features} />
                <br></br>
              </Card.Body>
            </Card.Body>
          </Card>
        </div>

        {localStorage.username === user_id && (
          <button onClick={deleteRoute}>Delete Route</button>
        )}
        {deleteErr && <p>Route could not be deleted!</p>}

        <div className={styles.reviewsAndDirections}>
          <AllReviews
            reviews={reviews}
            handleSaveReview={this.handleSaveReview}
          />
          <Directions coordinates={this.state.coordinates} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { route_id } = this.props;

    axios
      .get(`http://project-pedals.herokuapp.com/api/routes/${route_id}`)
      .then(res => {
        const { route } = res.data;
        const coordinates = res.data.route.features[0].geometry.coordinates;
        this.setState({
          route,
          coordinates,
          isLoading: false
        });
      });

    api.getReviews(route_id).then(reviews => {
      const ratings = reviews.map(review => {
        return review.rating;
      });
      const currentRating = (
        ratings.reduce((a, b) => a + b) / ratings.length
      ).toFixed(1);

      this.setState({ reviews, rating: currentRating });
    });

    api.getUser(localStorage.username).then(user => {
      this.setState({ user });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, reviews } = this.state;
    const { route_id } = this.props;
    const { disableSaveRoute } = this;
    if (prevState.user !== user) {
      this.setState({ disableButton: disableSaveRoute(user, route_id) });
    }
    if (prevState.reviews !== reviews) {
      const ratings = reviews.map(review => {
        return review.rating;
      });
      const currentRating = (
        ratings.reduce((a, b) => a + b) / ratings.length
      ).toFixed(1);
      this.setState({ rating: currentRating });
    }
  }

  setSelectedMarker = feature => {
    this.setState({ selectedMarker: feature });
  };

  closePopup = () => {
    this.setState({ selectedMarker: null });
  };

  saveRoute = e => {
    const { route } = this.state;
    api.saveRoute(localStorage.username, route).then(user => {
      this.setState({ user });
    });
  };

  disableSaveRoute = (user, route_id) => {
    return !utils.checkRouteIsSaved(user, route_id);
  };

  handleSaveReview = (body, rating) => {
    const { route_id } = this.props;
    const { username } = localStorage;

    api.postReview(route_id, username, body, rating).then(review => {
      this.setState(currentState => {
        return { reviews: [review, ...currentState.reviews] };
      });
    });
  };

  deleteRoute = () => {
    const { route_id } = this.props;
    this.setState({ deleteErr: false });
    api
      .removeRoute(route_id)
      .then(() => {
        navigate("/");
      })
      .catch(err => {
        console.dir(err);
        this.setState({ deleteErr: true });
      });
  };
}

export default SingleRoute;

//card subtitle class className="mb-2 text-muted"
