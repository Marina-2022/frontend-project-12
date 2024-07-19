import React from 'react';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          {t('header.hexlet')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {auth.token ? (
              <Button variant="primary" onClick={auth.logOut}>
                {t('header.exit')}
              </Button>
            ) : (
              ''
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
