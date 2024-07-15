/* eslint-disable */
import React, { useContext } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
// import TokenContext from './context/AuthContext.js';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Chat from './components/Chat';

// const { token } = useContext(TokenContext);

const App = () => (
  <div className="d-flex flex-column h-100">
    {/* <Login /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
