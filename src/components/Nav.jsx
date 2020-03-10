import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <Link to="/">
            <li>home page</li>
          </Link>
          <Link to="/routes">
            <li>routes</li>
          </Link>
          <Link to="/users/:user_id">
            <li>user page</li>
          </Link>
          <Link to="/routes/draw">
            <li>Draw routes</li>
          </Link>
          <Link to="/routes/:route_id">
            <li>single route :(</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
