import React from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logoW from "../assets/logoW.png";

const Header = ({ search, setSearch }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="mx-2">
            <img
              src={logoW}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Axel Mullins"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink to="/" className="text-white me-4">
              Home
            </NavLink>
            <NavLink to="/newpost" className="text-white me-4">
              New Post
            </NavLink>
            <NavLink to="/about" className="text-white me-4">
              About
            </NavLink>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
