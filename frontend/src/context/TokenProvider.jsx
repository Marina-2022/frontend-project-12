import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import TokenContext from './AuthContext.jsx';

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') === null ? '' : localStorage.getItem('token'));
  const [userName, setUsername] = useState(localStorage.getItem('username') === null ? '' : localStorage.getItem('username'));

  const saveToken = useCallback((newToken) => setToken(newToken), []);

  const saveUsername = useCallback((newUserName) => setUsername(newUserName), []);

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', userName);
  }, [token, userName]);

  const contextAuthValue = useMemo(() => (
    {
      token, userName, saveToken, saveUsername,
    }), [token, userName, saveToken, saveUsername]);

  return (
    <TokenContext.Provider value={contextAuthValue}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
