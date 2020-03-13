import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import attractionFlag from "../components/icons/location-pin.png";
import warningFlag from "../components/icons/warning-flag.png";
import AllReviews from "./AllReviews";
import RouteAttractions from "./RouteAttractions";
import Card from "react-bootstrap/Card";
import styles from "./styling/SingleRoute.module.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA"
});

class SingleRoute extends Component {
  state = {
    features: [
      {
        id: "939f91b44e6e9e02d291936b38d37d41",
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [-2.243437194562347, 53.47937156671131],
            [-2.245279265879219, 53.48020470020762],
            [-2.244689803058094, 53.481037817344],
            [-2.2421109032150355, 53.48081857757853],
            [-2.242184586067509, 53.480380094648496],
            [-2.2416688060989145, 53.48011700271519]
          ],
          type: "LineString"
        }
      },
      {
        id: "d62ef1b6b3e5aea6bdc449c5fa083087",
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [-2.245278926116555, 53.48020142417977],
          type: "Point"
        },
        markerComments: ["canal pusher"],
        markerType: "warning"
      },
      {
        id: "5758f5346eceea68c082b427b8f34d83",
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [-2.2448123582680353, 53.4810583735227],
          type: "Point"
        },
        markerComments: ["nice cafe"],
        markerType: "attraction"
      }
    ],
    calculatedDistance: 4,
    routeName: "Jessjelly Cycle Route",
    center: [-2.2426, 53.4808],
    zoom: [14],
    selectedMarker: null,
    city: "Liverpool",
    user_id: "jessjelly",
    type: "Scenic",
    averageRating: 4
  };
  render() {
    const {
      center,
      zoom,
      features,
      selectedMarker,
      routeName,
      calculatedDistance,
      city,
      user_id,
      type,
      averageRating
    } = this.state;
    return (
      <div>
        <section className={styles.map_block}>
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
                  <Layer type="line" id="route" key={feature.id}>
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
                        this.setSelectedMarker(feature);
                      }}
                    />
                  </Marker>
                );
              }
            })}
            {selectedMarker && (
              <Popup
                coordinates={selectedMarker.geometry.coordinates}
                onClick={this.closePopup}
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
                City: {city}
                <br></br>
                Distance: {calculatedDistance} miles
                <br></br> Route type: {type}
                <br></br>
                Average rating: {averageRating}
                <br></br>
                Posted by: {user_id}
              </Card.Subtitle>
              <br></br>
              <Card.Text>
                <br></br>
                <RouteAttractions features={features} />
                <br></br>
              </Card.Text>
            </Card.Body>
          </Card>
        </section>
        <AllReviews />
      </div>
    );
  }
  setSelectedMarker = feature => {
    this.setState({ selectedMarker: feature });
  };

  closePopup = () => {
    this.setState({ selectedMarker: null });
  };
}

export default SingleRoute;
