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

  // const [isUserData, setUserData] = useState<any>();
  const [isloading, setLoading] = useState<boolean>(false);
  const [isToken, setToken] = useState<any>(null);

  const login = (AccessToken: string, UserData: any, loading: boolean) => {
    dispatch({
      type: ReducerActions.logIn,
      payLoad: {
        isUserData: UserData,
        isloading: loading,
        isToken: AccessToken,
      },
    });

    AsyncStorage.setItem('UserToken', AccessToken);
  };




  const logOut = () => {
   dispatch({ 
    type: ReducerActions.logOut,
   })
    AsyncStorage.removeItem('UserToken');
  
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

  // const updateUser = async (Email) => {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     };

  //     const response = await fetch(
  //       `http://localhost:4100/userUpdate?Email=${encodeURI(Email)}`,
  //       options
  //     );
  //     const responseData = await response.json();
  //     console.log('updateUser function successfull', response);

  //     // setUserData(responseData);
  //     console.log('Updated user data successful', responseData);
  //   } catch (error) {
  //     console.log('Error with Updating user', error);
  //   }
  // };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    console.log('isToken:', isToken);
  }, [isToken, isloading]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
