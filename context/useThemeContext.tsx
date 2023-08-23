import { View, Text } from 'react-native'
import React, {useContext, createContext, useState, useEffect} from 'react'
import { AuthContext } from './AuthContext'


export const ThemeContext = createContext({})

export const ThemeProvider = ({children}) => {

	const {UserSettings} = useContext(AuthContext)
	

  return (
	<ThemeContext.Provider value={UserSettings}>
		{children}
	</ThemeContext.Provider>
	
  )
}