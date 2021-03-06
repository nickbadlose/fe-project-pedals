import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSite from "./components/MainSite";
import * as api from "./api";
import { navigate } from "@reach/router";

class App extends Component {
  state = { invalidUser: false, loggedIn: false };
  render() {
    const { logUserIn, logUserOut, signUp } = this;
    const { invalidUser } = this.state;
    return (
      <div className="App">
        <MainSite
          logUserIn={logUserIn}
          logUserOut={logUserOut}
          invalidUser={invalidUser}
          signUp={signUp}
        />
      </div>
    );
  }

  logUserIn = (e, username, password) => {
    e.preventDefault();
    api
      .postLogIn(username, password)
      .then(() => {
        this.setState({ invalidUser: false, loggedIn: true });
        // navigate(`/user/${username}`);
        navigate("/routes/draw");
      })
      .catch(() => {
        this.setState({ invalidUser: true });
      });
  };

  signUp = (e, username, password) => {
    e.preventDefault();
    api
      .postUser(username, password)
      .then(() => {
        return api.postLogIn(username, password);
      })
      .then(() => {
        this.setState({ loggedIn: true });
        // navigate(`/user/${username}`);
        navigate("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  logUserOut = () => {
    localStorage.clear();
    this.setState({ loggedIn: false });
    navigate("/");
  };
}

export default App;
