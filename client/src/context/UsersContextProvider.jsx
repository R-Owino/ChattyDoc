import React, { useState, useContext } from 'react';
import UsersContext from './UsersContext';

const UsersContextProvider = ({ children }) => {

    const [userAuth, setUserAuth] = useState({});

    const handleLogin = (user) => {
        setUserAuth(prevState => ({ ...prevState, [user]: true }));
    };
    
    const handleLogout = (user) => {
        setUserAuth(prevState => ({ ...prevState, [user]: false }));
    };

  return (
    <UsersContext.Provider value={{ userAuth, handleLogin, handleLogout }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;