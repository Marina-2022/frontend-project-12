import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => (
  <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
