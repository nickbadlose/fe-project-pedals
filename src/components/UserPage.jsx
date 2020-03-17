import React, { Component } from "react";
import * as api from "../api";
import LoadingIndicator from "./LoadingIndicator";
import SavedRoutesList from "../components/SavedRoutesList";
import { Link } from "@reach/router";

class UserPage extends Component {
  state = {
    username: "jessjelly",
    userInfo: "",
    isLoading: true
  };

  getUserNameFromStorage = () => {
    const username = localStorage.username;
    this.setState({ username });
  };

  getUserInfo = () => {
    const { username } = this.state;
    api.getUser(username).then(user => {
      this.setState({ userInfo: user, isLoading: false });
    });
  };

  componentDidMount() {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODQzNjcxMDA5OTJ9.Gb7BZ_QNwIXi0ooYbHq0cMY30cOGpEjPIDxap08rs0I"
    );
    localStorage.setItem("username", "jessjelly");
    this.getUserNameFromStorage();
    this.getUserInfo();
  }

  render() {
    const { userInfo, isLoading } = this.state;
    const { savedRoutes } = this.state.userInfo;

    if (localStorage.username === undefined) {
      return <div>
        <h2>Please sign in to view your user page</h2>
        {/* <Link to >Sign In</Link> */}
      </div>
    }

    return (
      <div>
        <h2>Welcome to your page, {userInfo._id}!</h2>
        <p>Here you will find your saved routes, ready for you to use.</p>
        {(isLoading) ? <LoadingIndicator /> : savedRoutes.length !== 0 ? (
          <div><h3>My Saved Routes</h3><SavedRoutesList savedRoutes={savedRoutes} /></div>
        ) : (
          <div>
          <p>No saved routes</p>
          <Link to={"/"}>Take me to home page</Link>
          </div> 
        )}
        
      </div>
    );
  }
}

export default UserPage;
