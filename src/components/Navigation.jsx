import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = ({ logUserOut }) => {
  return (
    <div>
      <Navbar bg="dark" expand="sm" variant="dark">
        <Navbar.Brand href="/">Pedals</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/routes/draw">Draw</Nav.Link>
            <NavDropdown title="Routes" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">Scenic</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Family Friendly
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Off-Road</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Training</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/routes">All</NavDropdown.Item>
            </NavDropdown>
            {localStorage.username ? (
              <NavDropdown
                title={localStorage.username}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href={`/users/${localStorage.username}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login" onClick={logUserOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // <>
              //   <Nav.Link href="/">{localStorage.username}</Nav.Link>
              //   <Nav.Link href="/">
              //     <button onClick={logUserOut} className="logOutButton">
              //       Log out
              //     </button>
              //   </Nav.Link>
              // </>
              <Nav.Link href="/login">Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;