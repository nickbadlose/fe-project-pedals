import React from "react";
import { Router } from "@reach/router";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import AllRoutes from "./Routes/AllRoutes";
import UserPage from "./UserPage";
import DrawRoute from "./DrawRoute";
import SingleRoute from "./Routes/SingleRoute";

import RouteType from "./Routes/RouteType";
import LogIn from "./LogIn";


const MainSite = ({ logUserIn, logUserOut, invalidUser }) => {
  return (
    <div>
      <Navigation logUserOut={logUserOut} />
      <Router>
        <HomePage path="/" />
        <AllRoutes path="/routes" />
        <UserPage path="/users/:user_id" />
        <DrawRoute path="/routes/draw" />

        <RouteType path="/routes/:type" />
        <SingleRoute path="/routes/id/:route_id" />

        <SingleRoute path="/routes/:route_id" />
        <LogIn path="/login" logUserIn={logUserIn} invalidUser={invalidUser} />

      </Router>
    </div>
  );
};

export default MainSite;
