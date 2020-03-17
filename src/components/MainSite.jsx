import React from "react";
import { Router } from "@reach/router";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import AllRoutes from "./Routes/AllRoutes";
import UserPage from "./UserPage";
import DrawRoute from "./DrawRoute";
import SingleRoute from "./Routes/SingleRoute";
import LogIn from "./LogIn";
import SignUp from "../components/SignUp";

const MainSite = ({ logUserIn, logUserOut, invalidUser, signUp }) => {
  return (
    <div>
      <Navigation logUserOut={logUserOut} />
      <Router>
        <HomePage path="/" />
        <AllRoutes path="/routes" />
        <UserPage path="/users/:user_id" />
        <DrawRoute path="/routes/draw" />
        <SingleRoute path="/routes/:route_id" />
        <LogIn path="/login" logUserIn={logUserIn} invalidUser={invalidUser} />
        <SignUp path="/signup" signUp={signUp} />
      </Router>
    </div>
  );
};

export default MainSite;
