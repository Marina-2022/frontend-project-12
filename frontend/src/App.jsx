// /* eslint-disable */
import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthContext from './context/AuthContext.jsx';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Chat from './components/Chat';
import Signup from './components/Signup';
import useAuth from './hooks/useAuth.js';
import Header from './components/Header.jsx';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userName, setUsername] = useState(localStorage.getItem('username') || '');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', userName);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [token, userName]);

  const logIn = useCallback(() => setLoggedIn(true), []);
  const logOut = useCallback(() => {
    setToken('');
    setUsername('');
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }, []);

  const contextAuthValue = useMemo(() => (
    {
      token, userName, loggedIn, logIn, logOut, setToken, setUsername,
    }), [token, userName, loggedIn, logIn, logOut, setToken, setUsername]);

  return (
    <AuthContext.Provider value={contextAuthValue}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.loggedIn ? children : <Navigate to="/login" />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;
