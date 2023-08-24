import { View, Text } from 'react-native'
import React, {useContext, createContext, useState, useEffect} from 'react'
import { AuthContext } from './AuthContext'
import { lightModeTheme, darkModeTheme } from '../assets/Themes/themes'


export const ThemeContext = createContext({})

export const ThemeProvider = ({children}) => {

	//@ts-ignore
	const  { UserSettings }    = useContext(AuthContext)

    //Allows to read if darkmode is set for safe
    const darkModeIndicator = UserSettings.darkmode ?? false;
  
    console.log('dark', darkModeIndicator)
    
    const [darkMode, setDarkMode] = React.useState(darkModeIndicator.darkmode)
  
    const switchTheme = darkMode ? darkModeTheme : lightModeTheme;  
	

  return (
	<ThemeContext.Provider value={switchTheme}>
		{children}
	</ThemeContext.Provider>
	
  )
}