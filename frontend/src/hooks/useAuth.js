import { useDispatch } from 'react-redux';
import {
  setToken, setUserName, logout,
} from '../slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  // const token = useSelector(selectToken);
  // const userName = useSelector(selectUserName);
  // const loggedIn = useSelector(selectLoggedIn);

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
