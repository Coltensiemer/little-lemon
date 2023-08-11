import { View, Text } from 'react-native'
import React, { useContext, createContext, useState, useEffect} from 'react'
import { G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({}); 

export const AuthProvider = ({children}) => { 


	const [isUserData, setUserData] = useState<any>()
	const [testData, setTestData] = useState<any>("hello!!")
	const [isloading, setLoading] = useState<boolean>(true)
	const [isToken, setToken] = useState<any>(null)

	const login = (token) =>  { 
		setLoading(true); 
		setToken(token)
		AsyncStorage.setItem('UserToken', token)
		setLoading(false)
		console.log("data", isUserData)
	}

	const logOut = () => { 
		setLoading(true);
		AsyncStorage.removeItem('UserToken'); 
		setToken(null)
		setLoading(true)
		
	}

	// Checks if User Token is already stored
	const isLoggedIn = async() => { 
		
		try {
			setLoading(true)
			let userToken = await AsyncStorage.getItem('UserToken')	
			console.log('AsnycToken', userToken)
			setToken(userToken);
			setLoading(false)
		} catch (error) {
			console.log('Is logged in error', error)	
		}
	}

	useEffect(() => {
		isLoggedIn()
	}, []);

	useEffect(() => {
		console.log('isToken:', isToken);
	  }, [isToken, isloading]);

	return ( 
		<AuthContext.Provider value={{login, logOut, isloading, isToken, setUserData, isUserData, testData, setTestData}}>
			{children}
		</AuthContext.Provider>

	)

}