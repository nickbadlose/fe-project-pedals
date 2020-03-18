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
    disableButton: false, rating: 0
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
    const { disableButton } = this.state;
    const { saveRoute, closePopup, setSelectedMarker } = this;

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
              height: "600px",
              width: "90vw"
            }}
            center={center}
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
                <h2>{routeName}</h2>
              </Card.Title>
              <br></br>
              <Card.Subtitle className="mb-2 text-muted">
                Location · {city}
                <br></br>
                Distance · {calculatedDistance.toFixed(2)} miles
                <br></br> Route type · {type}
                <br></br>
                Rating · {rating} / 5
                <br></br>
                Posted by · {user_id}
              </Card.Subtitle>
              <br></br>
              <Card.Body>
                <br></br>
                <RouteAttractions features={features} />
                <br></br>
              </Card.Body>
            </Card.Body>
          </Card>
        </div>

        {disableButton ? (
          <button onClick={saveRoute} disabled>
            Save Route
          </button>
        ) : (
          <button onClick={saveRoute}>Save Route</button>
        )}
        <AllReviews reviews={reviews} handleSaveReview={this.handleSaveReview}/>

        <Directions coordinates={this.state.coordinates} />
      </div>
    );
  }

  componentDidMount() {
    const {route_id} = this.props;

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
      const currentRating = (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(1);

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
    if(prevState.reviews !== reviews) {
      const ratings = reviews.map(review => {
        return review.rating;
      });
      const currentRating = (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(1);
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
    const {route_id} = this.props;
    const {username} = localStorage;

    api.postReview(route_id, username, body, rating).then(review => {
      this.setState(currentState => {

        return {reviews: [review, ...currentState.reviews]}
      })
    })

  }

}

export default SingleRoute;
