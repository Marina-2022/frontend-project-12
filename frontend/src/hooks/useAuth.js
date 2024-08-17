import { useDispatch } from 'react-redux';
import {
  setToken, setUserName, logout,
} from '../slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (tokenUser, username) => {
    localStorage.setItem('token', tokenUser);
    localStorage.setItem('username', username);
    dispatch(setToken(tokenUser));
    dispatch(setUserName(username));
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logout());
  };

  return {
    logIn, logOut,
  };
};

export default useAuth;
