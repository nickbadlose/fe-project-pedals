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
            <Nav.Link href="/" className={styles.navLabel}>
              Home
            </Nav.Link>
            <Nav.Link href="/routes/draw" className={styles.navLabel}>
              Draw
            </Nav.Link>
            <NavDropdown
              title="Routes"
              id="basic-nav-dropdown"
              className={styles.navLabel}
            >
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
                id="basic-nad-dropdown"
                className={styles.navLabel}
                alignRight={true}
              >
                <NavDropdown.Item href={"/my_page"}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={logUserOut}
                  className={styles.navUserName}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title="Log in"
                id="basic-nav-dropdown"
                alignRight={true}
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
