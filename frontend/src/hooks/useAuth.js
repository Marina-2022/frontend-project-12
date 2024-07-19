import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// const useAuth = () => useContext(AuthContext);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // console.log('context', context);
  return context;
};

export default useAuth;
