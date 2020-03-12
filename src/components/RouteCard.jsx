import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./styling/RouteCard.module.css";
// import map_card_example from "./icons/map_card_example.jpg";

const RouteCard = props => {
  const { route } = props;
  return (
    <Card className={styles.routeCard}>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>{route.routeName}</Card.Title>
        <Card.Text>
          Average rating: {route.averageRating}
          <br></br>
          City: {route.city}
          <br></br>
          Distance: {route.calculatedDistance} miles
        </Card.Text>
        <Button variant="primary">See route</Button>
      </Card.Body>
      <Card.Footer>
        <small>Posted by: {route.user_id}</small>
      </Card.Footer>
    </Card>
  );
};

export default RouteCard;
