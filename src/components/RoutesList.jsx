import React, { Component } from "react";
import RouteCard from "./Routes/RouteCard";
import CardDeck from "react-bootstrap/CardDeck";
import styles from "./styling/SavedRoutes.module.css";

class RoutesList extends Component {
  render() {
    const { routes } = this.props;

    return (
      <CardDeck className={styles.CardDeck}>
        {" "}
        {routes.map(route => {
          return <RouteCard route={route} key={route._id} />;
        })}
      </CardDeck>
    );
  }
}

export default RoutesList;
