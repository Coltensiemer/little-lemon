import { View, Text } from 'react-native'
import React, { useContext, createContext, useState, Children } from 'react'



export const AuthContext = createContext({}); 

export const AuthProvider = ({children}) => { 

	const [isloading, setLoading] = useState(true)
	const [isToken, setToken] = useState(null)

	const login = () =>  { 
		setToken('token')
		setLoading(false)
	}

	const logOut = () => { 
		setToken(null)
		setLoading(true)
	}
	return ( 
		<AuthContext.Provider value={{login, logOut, isloading, isToken}}>
			{children}
		</AuthContext.Provider>

	)

}