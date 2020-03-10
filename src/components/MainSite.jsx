import React from "react";
import { Router } from "@reach/router";
import Nav from "./Nav";
import Header from "./Header";
import HomePage from "./HomePage";
import SavedRoutes from "./SavedRoutes";
import UserPage from "./UserPage";
import DrawRoute from "./DrawRoute";
import SingleRoute from "./SingleRoute";

const MainSite = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Router>
        <HomePage path="/" />
        <SavedRoutes path="/routes" />
        <UserPage path="/users/:user_id" />
        <DrawRoute path="/routes/draw" />
        <SingleRoute path="/routes/:route_id" />
      </Router>
    </div>
  );
};

export default MainSite;
