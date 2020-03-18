import React, { Component } from "react";
import * as api from "../api";
import LoadingIndicator from "./LoadingIndicator";
import RoutesList from "./RoutesList";
import { Link } from "@reach/router";

class UserPage extends Component {
  state = {
    username: "jessjelly",
    userInfo: "",
    isLoadingInfo: true,
    isLoadingRoutes: true
  };

  render() {
    const {
      userInfo,
      usersRoutes,
      isLoadingRoutes,
      isLoadingInfo
    } = this.state;
    const { savedRoutes } = userInfo;

    if (localStorage.username === undefined) {
      return (
        <div>
          <h2>Please sign in to view your user page</h2>
          <Link to={"/signup"}>Signup here!</Link>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>
          <h2>Welcome to your page, {userInfo._id}!</h2>
          <p>Your Routes</p>
          {isLoadingRoutes ? (
            <LoadingIndicator />
          ) : usersRoutes.length !== 0 ? (
            <div>
              <h3>Your Routes</h3>
              <RoutesList routes={usersRoutes} />
            </div>
          ) : (
            <div>
              <p>No Created Routes</p>
              <Link to={"/routes/draw"}>Create a route</Link>
            </div>
          )}
        </div>
        <div>
          {isLoadingInfo ? (
            <LoadingIndicator />
          ) : savedRoutes.length !== 0 ? (
            <div>
              <h3>Favourited Routes</h3>
              <RoutesList routes={savedRoutes} />
            </div>
          ) : (
            <div>
              <p>No Favourited Routes</p>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }

  getUserNameFromStorage = () => {
    const username = localStorage.username;
    this.setState({ username });
  };

  getUserInfo = () => {
    const { username } = this.state;
    api.getUser(username).then(user => {
      this.setState({ userInfo: user, isLoadingInfo: false });
    });
  };

  getUserRoutes = () => {
    const { username } = this.state;

    api.getRoutesByUser(username).then(routes => {
      this.setState({ usersRoutes: routes, isLoadingRoutes: false });
    });
  };

  componentDidMount() {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODQzNjcxMDA5OTJ9.Gb7BZ_QNwIXi0ooYbHq0cMY30cOGpEjPIDxap08rs0I"
    );
    //localStorage.setItem("username", "jessjelly");
    this.getUserNameFromStorage();
    this.getUserInfo();
    this.getUserRoutes();
  }
}

export default UserPage;
