import React from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Header = () => {
  const { width, search, setSearch } = useContext(DataContext)

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="mx-2">
            {width < 768 ? (
              <FaMobileAlt size="40px" color="grey"/>
            ) : width < 992 ? (
              <FaTabletAlt size="40px" color="grey" />
            ) : (
              <FaLaptop size="40px" color="grey" />
            )}
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
          <Form className="d-flex" onSubmit={(e) => {e.preventDefault()}}>
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
