import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../styling/RouteCard.module.css";
import routePlaceholder from "../icons/routePlaceholder.jpg";
import Moment from "react-moment";

const RouteCard = props => {
  const { route } = props;
  return (
    <div className={styles.routeCard}>
      <Card>
        <Card.Img src={routePlaceholder} className={styles.routeImage} />
        <Card.Body>
          <Card.Title>{route.routeName}</Card.Title>
          <Card.Text>
            Average rating: {route.averageRating}
            <br></br>
            City: {route.city}
            <br></br>
            Distance: {route.calculatedDistance.toFixed(1)} miles
            <br></br>
            Route type: {route.type}
            <br></br>
            Posted on: <Moment format="D MMM YYYY">{route.posted}</Moment>
          </Card.Text>
          <Button variant="primary">See route</Button>
        </Card.Body>
        <Card.Footer>
          <small>By {route.user_id}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default RouteCard;
