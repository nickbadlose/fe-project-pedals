import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../styling/RouteCard.module.css";
import routePlaceholder from "../icons/routePlaceholder.jpg";
import Moment from "react-moment";
import { Link } from "@reach/router";
import PreviewImg from "../icons/routePreview";

const RouteCard = props => {
  const { route } = props;
  const { coordinates } = route.features[0].geometry;
  const routeImg = PreviewImg(coordinates);

  return (
    <div className={styles.routeCard}>
      <Card>
        <Card.Img src={routeImg} className={styles.routeImage} />
        <Card.Body>
          <Card.Title>{route.routeName}</Card.Title>
          <Card.Text>
            Average rating: {route.averageRating}
            <br></br>
            City: {route.city}
            <br></br>
            Distance: {route.calculatedDistance} miles
            <br></br>
            Route type: {route.type}
            <br></br>
            Posted on: <Moment format="D MMM YYYY">{route.posted}</Moment>
          </Card.Text>
          <Button variant="primary">
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
          <small>By {route.user_id}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default RouteCard;
