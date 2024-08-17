import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Provider as ProviderRollbar,
  ErrorBoundary,
} from '@rollbar/react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Chat from './components/Chat';
import Signup from './components/Signup';
import Header from './components/Header.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_TOKEN_ACCESS,
  captureUncaught: true,
  captureUnhandledRejections: true,
  invironment: 'production',
};

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </ProviderRollbar>
  </div>
);

export default App;
