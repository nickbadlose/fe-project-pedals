import React from "react";
import { Router } from "@reach/router";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import AllRoutes from "./Routes/AllRoutes";
import UserPage from "./UserPage";
import DrawRoute from "./DrawRoute";
import SingleRoute from "./Routes/SingleRoute";

const MainSite = () => {
  return (
    <div>
      <Navigation />
      <Router>
        <HomePage path="/" />
        <AllRoutes path="/routes" />
        <UserPage path="/users/:user_id" />
        <DrawRoute path="/routes/draw" />
        <SingleRoute path="/routes/:route_id" />
      </Router>
    </div>
  );
};

export default MainSite;
