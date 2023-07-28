import { View, Text } from 'react-native'
import React, { useContext, createContext, useState, useEffect} from 'react'



export const AuthContext = createContext({}); 

export const AuthProvider = ({children}) => { 

	const [isloading, setLoading] = useState<boolean>(true)
	const [isToken, setToken] = useState<any>(null)

	const login = () =>  { 
		setToken(12342)
		setLoading(false)

	}

	const logOut = () => { 
		setToken(null)
		setLoading(true)
		
	}

	useEffect(() => {
		console.log('isToken:', isToken);
	  }, [isToken]);

	return ( 
		<AuthContext.Provider value={{login, logOut, isloading, isToken}}>
			{children}
		</AuthContext.Provider>

	)

}