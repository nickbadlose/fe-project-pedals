import React, { Component } from "react";
import RouteCard from "../components/Routes/RouteCard";

class SavedRoutesList extends Component {
  render() {
    const { savedRoutes } = this.props;

    return savedRoutes.map(route => {
      return <RouteCard route={route} />;
    });
  }
}

export default SavedRoutesList;
