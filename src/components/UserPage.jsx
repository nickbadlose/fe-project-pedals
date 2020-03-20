import React, { Component } from "react";
import * as api from "../api";
import LoadingIndicator from "./LoadingIndicator";
import RoutesList from "./RoutesList";
import { Link } from "@reach/router";
import styles from "../components/styling/UserPage.module.css";

class UserPage extends Component {
  state = {
    username: null,
    userSavedRoutes: [],
    userRoutes: [],
    isLoadingInfo: true,
    isLoadingRoutes: true
  };

  render() {
    const {
      userSavedRoutes,
      userRoutes,
      isLoadingRoutes,
      isLoadingInfo
    } = this.state;
    const { username } = localStorage;

    if (localStorage.username === undefined) {
      return (
        <div>
          <h2 className={styles.h2}>Please sign in to view your user page</h2>
          <Link to={"/signup"}>Signup here!</Link>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>
          <h2 className={styles.h2}>Welcome to your page, {username}!</h2>
          {isLoadingRoutes ? (
            <LoadingIndicator />
          ) : userRoutes.length !== 0 ? (
            <div>
              <h3 className={styles.h3}>Your Routes</h3>
              <RoutesList routes={userRoutes} />
            </div>
          ) : (
            <div>
              <h3 className={styles.h3}>No Created Routes</h3>
              <Link to={"/routes/draw"}>Create a route</Link>
            </div>
          )}
        </div>
        <div>
          {isLoadingInfo ? (
            <LoadingIndicator />
          ) : userSavedRoutes.length !== 0 ? (
            <div>
              <h3 className={styles.h3}>Favourited Routes</h3>
              <RoutesList routes={userSavedRoutes} />
            </div>
          ) : (
            <div>
              <p className={styles.h3}>No Favourited Routes</p>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }


  getUserSavedRoutes = () => {
    const { username } = localStorage;
    api.getUser(username).then(user => {
      this.setState({ userSavedRoutes: user.savedRoutes, isLoadingInfo: false });
    });
  };

  getUserRoutes = () => {
    const { username } = localStorage;

    
    api.getRoutesByUser(username).then(routes => {
      this.setState({ userRoutes: routes, isLoadingRoutes: false });
    });
  };

  componentDidMount() {
  
  this.getUserSavedRoutes()
  this.getUserRoutes()
  }
}

export default UserPage;
