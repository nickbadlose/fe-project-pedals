import React, { Component } from "react";
import RouteCard from "./RouteCard";
import CardDeck from "react-bootstrap/CardDeck";
import styles from "../styling/AllRoutes.module.css";
import * as api from "../../api.js";
// import FilterType from "../FilterType";
import SortRoutes from "../SortRoutes";
import SearchBox from "../SearchBox";


class AllRoutes extends Component {
  state = {
    routes: [],
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
          <h2>All routes</h2>
          <section className={styles.filterSection}>
            {/* <FilterType /> */}
            <SortRoutes sortRoutes={this.sortRoutes} />
            <SearchBox searchBoxButton={this.searchBoxButton} />
          </section>
          <CardDeck className={styles.routeCard_block}>
            {routes.map(route => {
              return <RouteCard key={route._id} route={route} />;
            })}
          </CardDeck>
        </div>
      );
  }

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
        this.setState({ routes, isLoading: false, err: false });
      })
      .catch(err => {
        console.log(err, "error <<");
      });
  };
}

export default AllRoutes;
