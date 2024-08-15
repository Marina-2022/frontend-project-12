import React from 'react';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, selectToken } from '../slices/authSlice';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { t } = useTranslation();
  // const auth = useAuth();
  const { token } = useSelector((state) => state.auth);
  const { logOut } = useAuth();

  // console.log('localStorage', localStorage.getItem('token'));

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link className="text-decoration-none text-black" to="/">
            {t('header.hexlet')}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <Button variant="primary" onClick={logOut}>
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
