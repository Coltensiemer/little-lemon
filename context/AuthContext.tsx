import { View, Text } from 'react-native'
import React, { useContext, createContext, useState, Children } from 'react'



export const AuthContext = createContext({}); 

export const AuthProvider = ({children}) => { 

	const [isloading, setLoading] = useState<boolean>(true)
	const [isToken, setToken] = useState<any>()

	const login = () =>  { 
		setToken(null)
		setLoading(false)
		console.log('login')
	}

	const logOut = () => { 
		setToken(null)
		setLoading(true)
		console.log('logged Out', isToken)
	}
	return ( 
		<AuthContext.Provider value={{login, logOut, isloading, isToken}}>
			{children}
		</AuthContext.Provider>

	)

}