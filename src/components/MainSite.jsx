import React from "react";
import { Router } from "@reach/router";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import AllRoutes from "./Routes/AllRoutes";
import UserPage from "./UserPage";
import DrawRoute from "./DrawRoute";
import SingleRoute from "./Routes/SingleRoute";
import ErrorPage from "./ErrorPage";
import RouteType from "./Routes/RouteType";
import LogIn from "./LogIn";
import SignUp from "../components/SignUp";
import Footer from "../components/Footer";

const MainSite = ({ logUserIn, logUserOut, invalidUser, signUp }) => {
  return (
    <div>
      <Navigation logUserOut={logUserOut} />
      <Router>
        <HomePage path="/" />
        <RouteType path="/routes" type={''}/>
        <UserPage path="/my_page" />
        <DrawRoute path="/routes/draw" />
        <RouteType path="/routes/:type" />
        <SingleRoute path="/routes/id/:route_id" />
        <LogIn path="/login" logUserIn={logUserIn} invalidUser={invalidUser} />
        <SignUp path="/signup" signUp={signUp} />
        <ErrorPage default />
      </Router>
      <Footer />
    </div>
  );
};

export default MainSite;
