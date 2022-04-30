import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
    getAccesTokenApi, getRefreshTokenApi, logout, refreshAccessTokenApi
} from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  
  const [user, setUser] = useState({
      
    user:null,
    isLoading:true
  });
  

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}


function checkUserLogin(setUser) {
  const accessToken = getAccesTokenApi();

  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();

    if (!refreshToken) {
      logout();
      setUser({
        user: null,
        isLoading: false
      });
    } else {
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken)
    });
  }
}