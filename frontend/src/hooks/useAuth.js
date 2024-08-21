import { useDispatch } from 'react-redux';
import {
  setToken, setUserName, logout,
} from '../slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (tokenUser, username) => {
    dispatch(setToken(tokenUser));
    dispatch(setUserName(username));
  };

  const logOut = () => {
    dispatch(logout());
  };

  return {
    logIn, logOut,
  };
};

export default useAuth;
