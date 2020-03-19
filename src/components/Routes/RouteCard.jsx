import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../styling/RouteCard.module.css";
import Moment from "react-moment";
import { Link } from "@reach/router";
import PreviewImg from "../icons/routePreview";
import mapLocation from "../icons/map_location.png";
import distanceIcon from "../icons/distance-icon.png";
import bikeIcon from "../icons/bike-icon.png";
import starIcon from "../icons/star.png";

const RouteCard = props => {
  const { route } = props;
  const { coordinates } = route.features[0].geometry;
  const routeImg = PreviewImg(coordinates);

  return (
    <div className={styles.cardBlock}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Img
            style={{ paddingBottom: "5px" }}
            variant="center"
            src={routeImg}
            className={styles.routeImage}
          />
          <Card.Title className={styles.cardTitle}>
            {route.routeName}
          </Card.Title>
          <Card.Text className={styles.cardText}>
            <div>
            <img
              className={styles.mapIcon}
              src={mapLocation}
              alt="map location"
            />{" "}
            {route.city.charAt(0).toUpperCase() + route.city.slice(1)}
            <br></br>
            <img
              className={styles.distanceIcon}
              src={distanceIcon}
              alt="distance icon"
            />{" "}
            {route.calculatedDistance.toFixed(1)} miles
            </div>
            <div>
            <img
              className={styles.bikeIcon}
              src={bikeIcon}
              alt="bike icon"
            />{" "}
            {route.type.charAt(0).toUpperCase() + route.type.slice(1)} route
            <br></br>
            <img
              className={styles.starIcon}
              src={starIcon}
              alt="bike icon"
            />{" "}
            Rating: {route.averageRating} / 5
            </div>
          </Card.Text>
          <Button variant="primary" className={styles.cardButton}>
            {" "}
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/routes/id/${route._id}`}
            >
              See route
            </Link>
          </Button>
        </Card.Body>
        <Card.Footer>
          {route.user_id === localStorage.username ? (
            <small>
              By You on <Moment format="D MMM YYYY">{route.posted}</Moment>
            </small>
          ) : (
            <small>
              By {route.user_id} on{" "}
              <Moment format="D MMM YYYY">{route.posted}</Moment>
            </small>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default RouteCard;
