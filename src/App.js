import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSite from "./components/MainSite";
import * as api from "./api";
import { navigate } from "@reach/router";

class App extends Component {
  state = { invalidUser: false };
  render() {
    const { logUserIn, logUserOut } = this;
    const { invalidUser } = this.state;
    return (
      <div className="App">
        <MainSite
          logUserIn={logUserIn}
          logUserOut={logUserOut}
          invalidUser={invalidUser}
        />
      </div>
    );
  }

  logUserIn = (e, username, password) => {
    e.preventDefault();
    api
      .postLogIn(username, password)
      .then(() => {
        this.setState({ invalidUser: false });
        // navigate(`/user/${username}`);
        navigate("/");
      })
      .catch(() => {
        this.setState({ invalidUser: true });
      });
  };

  logUserOut = () => {
    localStorage.clear();
  };
}

export default App;
