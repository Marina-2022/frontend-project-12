import { useDispatch, useSelector } from 'react-redux';
import {
  setToken, setUserName, logout, selectLoggedIn, selectToken, selectUserName,
} from '../slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userName = useSelector(selectUserName);
  const loggedIn = useSelector(selectLoggedIn);

  const logIn = (tokenUser, username) => {
    localStorage.setItem('token', tokenUser);
    localStorage.setItem('username', username);
    dispatch(setToken(token));
    dispatch(setUserName(userName));
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logout());
  };

  return {
    loggedIn, logIn, logOut,
  };
};

export default useAuth;

// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// // const useAuth = () => useContext(AuthContext);

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   // console.log('context', context);
//   return context;
// };

// export default useAuth;
