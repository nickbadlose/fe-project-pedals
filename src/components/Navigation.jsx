import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import pedals from "./icons/pedals.png";
import styles from "./styling/Navigation.module.css";

const Navigation = ({ logUserOut }) => {
  return (
    <div>
      <Navbar className={styles.colorNav} expand="sm" variant="dark">
        <Navbar.Brand href="/">
          <img src={pedals} className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/routes/draw">Draw</Nav.Link>
            <NavDropdown title="Routes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/routes/scenic">Scenic</NavDropdown.Item>
              <NavDropdown.Item href="/routes/family%20friendly">
                Family Friendly
              </NavDropdown.Item>
              <NavDropdown.Item href="/routes/off-road">
                Off-Road
              </NavDropdown.Item>
              <NavDropdown.Item href="/routes/training">
                Training
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/routes">All</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            {localStorage.username ? (
              <NavDropdown
                title={localStorage.username}

                id="basic-nav-dropdown"
                // className="dropdown-menu dropdown-menu-left"
              >
                <NavDropdown.Item href={`/users/${localStorage.username}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logUserOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title="Log in"
                id="basic-nav-dropdown"
                // className="dropdown-menu dropdown-menu-left"
              >
                <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
