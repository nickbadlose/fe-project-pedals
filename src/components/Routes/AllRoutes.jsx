import React, { Component } from "react";
import RouteCard from "./RouteCard";
import CardDeck from "react-bootstrap/CardDeck";
import styles from "../styling/RouteCard.module.css";
import * as api from "../../api.js";

class AllRoutes extends Component {
  state = {
    routes: [],
    isLoading: true,
    err: null
  };
  render() {
    const { routes, isLoading } = this.state;
    console.log(routes);
    if (isLoading) return <p>Loading...</p>;
    else
      return (
        <div>
          <h2>All routes</h2>
          <h3>Filter section</h3>
          <p>{routes.routeName}</p>
          <CardDeck className={styles.routeCard_block}>
            {routes.map(route => {
              return <RouteCard key={route._id} route={route} />;
            })}
          </CardDeck>
        </div>
      );
  }

  componentDidMount() {
    this.fetchRoutes();
  }

  fetchRoutes = () => {
    api
      .getRoutes()
      .then(routes => {
        this.setState({ routes, isLoading: false, err: false });
      })
      .catch(err => {
        console.log(err, "error <<");
      });
  };
}

export default AllRoutes;
