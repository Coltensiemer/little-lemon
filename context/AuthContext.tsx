import { View, Text } from 'react-native';
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
  Context,
} from 'react';
import { G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextReducer, ReducerActions } from './AuthReducer';
import { ProfileState } from './ProfileReducer';
import { getMenu, MenuState } from '../javascript/menuList';
import { daySize } from 'react-native-paper-dates/lib/typescript/Date/dateUtils';

export const AuthContext = createContext({});
export const useAuthContext = () => React.useContext(AuthContext);

export interface ContextState {
  isUserData: {};
  isloading: boolean;
  istoken: string;
  userSettings: {
    darkmode: boolean;
    specialOffers: boolean;
    newsletters: boolean;
  };
}

export interface AuthContextType {
  login: (token: string, userData: any, loading: boolean) => void;
}

const INITIAL_State: ContextState = {
  isUserData: {},
  isloading: false,
  istoken: null,
  userSettings: {
    darkmode: false,
    specialOffers: false,
    newsletters: false,
  },
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContextReducer, INITIAL_State);

  const login = (AccessToken: string, UserData: any, loading: boolean) => {
    dispatch({
      type: ReducerActions.logIn,
      payload: {
        isUserData: UserData,
        isloading: loading,
        istoken: AccessToken,
      },
    });

    AsyncStorage.setItem('UserToken', AccessToken);
  };

  const logOut = () => {
    dispatch({
      type: ReducerActions.logOut,
    });
    AsyncStorage.removeItem('UserToken');
  };

  // Checks if User Token is already stored
  const isLoggedIn = async () => {
    try {
      let userToken = await AsyncStorage.getItem('UserToken');
      dispatch({
        type: ReducerActions.loggedIn,
        payload: {
          isToken: userToken,
          isLoading: false,
        },
      });
      console.log('AsnycToken', userToken);
    } catch (error) {
      console.log('Is logged in error', error);
    }
  };

  const updateUser = async (userData: ProfileState) => {
    try {
      dispatch({
        type: ReducerActions.updateUser,
        payload: {
          isUserData: userData,
        },
      });
    } catch (error) {
      console.log('There was an error Updating User', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
