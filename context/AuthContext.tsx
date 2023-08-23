import { View, Text } from 'react-native'
import React, { useContext, createContext, useState, useEffect} from 'react'
import { G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({}); 

// export interface notifications { 
// 	darkmode: boolean,
// 	specialOffers: boolean,
// 	newsletters: boolean
// }

export const AuthProvider = ({children}) => { 

	const [isSettingData, setSettingData] = useState<any>()
	const [isUserData, setUserData] = useState<any>()
	const [isloading, setLoading] = useState<boolean>(false)
	const [isToken, setToken] = useState<any>(null)
	const [UserSettings, setUserSettings] = useState<any>({darkmode: true, specialOffers: false, newsletters: false})

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

	const updateUser = async(email) => { 

		try {
			
			const options = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			  };

			  const response = await fetch(`/userUpdate?email=${encodeURIComponent(email)}`, options)

			  console.log("Update user info was successfull", response)
			
		} catch (error) {
			console.log('Error with Updating user', error)
			
		}
	}

	useEffect(() => {
		isLoggedIn()
	}, []);

	useEffect(() => {
		console.log('isToken:', isToken);
	  }, [isToken, isloading]);

	return ( 
		<AuthContext.Provider value={{login, logOut, isloading, isToken, setUserData, isUserData, isSettingData, setSettingData, UserSettings, setUserSettings, updateUser}}>
			{children}
		</AuthContext.Provider>

	)

}