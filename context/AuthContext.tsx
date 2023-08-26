import { View, Text } from 'react-native';
import React, { useContext, createContext, useState, useEffect, useReducer, Context } from 'react';
import { G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextReducer } from './AuthReducer';

export const AuthContext = createContext({});
export const useAuthContext = () => React.useContext(AuthContext);

export interface ContextState { 
  isUserData: {}, 
  isloading: boolean,
  istoken: string,
  userSettings: { 
    darkmode: boolean,
    specialOffers: boolean,
    newsletters: boolean,
  }

}





const INITIAL_State: ContextState = { 
  isUserData: {}, 
  isloading: false,
  istoken: "",
  userSettings: { 
    darkmode: false,
    specialOffers: false, 
    newsletters: false, 
  }
}

export const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(ContextReducer, INITIAL_State); 



  
  const [isUserData, setUserData] = useState<any>();
  const [isloading, setLoading] = useState<boolean>(false);
  const [isToken, setToken] = useState<any>(null);
  const [UserSettings, setUserSettings] = useState<notifications>({
    darkmode: false,
    specialOffers: false,
    newsletters: false,
  });

  const login = (token) => {
    setLoading(true);
    setToken(token);
    AsyncStorage.setItem('UserToken', token);
    setLoading(false);
    console.log('data', isUserData);
  };

  const logOut = () => {
    setLoading(true);
    AsyncStorage.removeItem('UserToken');
    setToken(null);
    setLoading(true);
  };

  // Checks if User Token is already stored
  const isLoggedIn = async () => {
    try {
      setLoading(true);
      let userToken = await AsyncStorage.getItem('UserToken');
      console.log('AsnycToken', userToken);
      setToken(userToken);
      setLoading(false);
    } catch (error) {
      console.log('Is logged in error', error);
    }
  };

  const updateUser = async (Email) => {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch(
        `http://localhost:4100/userUpdate?Email=${encodeURI(Email)}`,
        options
      );
      const responseData = await response.json();
      console.log('updateUser function successfull', response);

      setUserData(responseData);
      console.log('Updated user data successful', responseData);
    } catch (error) {
      console.log('Error with Updating user', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    console.log('isToken:', isToken);
  }, [isToken, isloading]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        isloading,
        isToken,
        setUserData,
        isUserData,
     
        UserSettings,
        setUserSettings,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
