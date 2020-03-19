import React, { Component } from "react";
import RouteCard from "./RouteCard";
import CardDeck from "react-bootstrap/CardDeck";
import styles from "../styling/AllRoutes.module.css";
import * as api from "../../api.js";
import SortRoutes from "../SortRoutes";
import SearchBox from "../SearchBox";

class AllRoutes extends Component {
  state = {
    routes: [],
    unfilteredRoutes: [],
    sort_by: "averageRating",
    order: "desc",
    isLoading: true,
    err: null
  };

  render() {
    const { routes, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>;
    else
      return (
        <div>
          <section className={styles.filterSection}>
            <SortRoutes sortRoutes={this.sortRoutes} />
            <SearchBox searchRoutes={this.searchRoutes} />
          </section>
          <CardDeck className={styles.routeCard_block}>
            {routes.map(route => {
              return <RouteCard key={route._id} route={route} />;
            })}
          </CardDeck>
        </div>
      );
  }

  searchRoutes = searchTerm => {
    const { unfilteredRoutes } = this.state;
    const filteredList = unfilteredRoutes.filter(route => {
      return (
        route.city.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        route.user_id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    });
    this.setState({ routes: filteredList });
  };

  sortRoutes = (sort_by, order) => {
    this.setState({ sort_by, order });
  };

  componentDidMount() {
    this.fetchRoutes();
  }

  componentDidUpdate(prevProps, prevState) {
    const { type } = this.props;
    const { sort_by, order } = this.state;
    const changeType = prevProps.type !== type;
    const changeSort = sort_by !== prevState.sort_by;
    const changeOrder = order !== prevState.order;

    if (changeType || changeSort || changeOrder) {
      this.fetchRoutes();
    }
  }

  fetchRoutes = () => {
    const { type } = this.props;
    const { sort_by, order } = this.state;

    api
      .getRoutes(type, sort_by, order)
      .then(routes => {
        this.setState({
          routes,
          unfilteredRoutes: routes,
          isLoading: false,
          err: false
        });
      })
      .catch(err => {
        console.log(err, "error <<");
      });
  };
}

export default AllRoutes;
