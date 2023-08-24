import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
	useTheme
  } from 'react-native-paper';

export const lightModeTheme = {
	...DefaultTheme,
	myOwnProperty: true,
	colors: {
	  primary: '#004478',
	  onPrimary: '#ffffff',
	  primaryContainer: '#9ddfff',
	  onPrimaryContainer: '#001625',
	  secondary: '#3f506b',
	  onSecondary: '#ffffff',
	  secondaryContainer: '#bbd4f5',
	  onSecondaryContainer: '#041a24',
	  tertiary: '#47654a',
	  onTertiary: '#ffffff',
	  tertiaryContainer: '#c4ebcc',
	  onTertiaryContainer: '#092107',
	  error: 'red',
	  onError: '#ffffff',
	  errorContainer: '#d6adff',
	  onErrorContainer: '#000241',
	  background: '#fffbff',
	  onBackground: '#161b1e',
	  surface: '#fffbff',
	  onSurface: '#161b1e',
	  surfaceVariant: '#cfede1',
	  onSurfaceVariant: '#39464d',
	  outline: '#67767f',
	  outlineVariant: 'rgb(180, 197, 208)',
	  shadow: 'rgb(0, 0, 0)',
	  scrim: 'rgb(0, 0, 0)',
	  inverseSurface: 'rgb(42, 189, 248)',
	  inverseOnSurface: 'rgb(231, 239, 248)',
	  inversePrimary: 'rgb(42, 189, 248)',
	  elevation: {
		level0: 'transparent',
		level1: 'rgb(242, 243, 248)',
		level2: 'rgb(235, 238, 244)',
		level3: 'rgb(227, 233, 240)',
		level4: 'rgb(224, 232, 239)',
		level5: 'rgb(219, 228, 236)',
	  },
	  surfaceDisabled: 'rgba(22, 27, 30, 0.12)',
	  onSurfaceDisabled: 'rgba(38, 27, 30, 0.38)',
	  backdrop: 'rgba(36, 48, 54, 0.4)',
	  blue: 'blue',
	},
  };


  export const darkModeTheme = {
	...DefaultTheme,
	myOwnProperty: true,
	dark: true, // Indicate that this is a dark mode theme
	colors: {
	  primary: '#1763b3', // Adjusted primary color for dark mode
	  onPrimary: '#ffffff',
	  primaryContainer: '#325a6e',
	  onPrimaryContainer: '#ffffff',
	  secondary: '#4f638e', // Adjusted secondary color for dark mode
	  onSecondary: '#ffffff',
	  secondaryContainer: '#738fa5',
	  onSecondaryContainer: '#ffffff',
	  tertiary: '#5f7d63', // Adjusted tertiary color for dark mode
	  onTertiary: '#ffffff',
	  tertiaryContainer: '#89a581',
	  onTertiaryContainer: '#ffffff',
	  error: 'red',
	  onError: '#ffffff',
	  errorContainer: '#a33c3c',
	  onErrorContainer: '#ffffff',
	  background: '#161b1e', // Adjusted background color for dark mode
	  onBackground: '#ffffff',
	  surface: '#1e2427', // Adjusted surface color for dark mode
	  onSurface: '#ffffff',
	  surfaceVariant: '#39464d',
	  onSurfaceVariant: '#ffffff',
	  outline: '#67767f',
	  outlineVariant: 'rgb(180, 197, 208)',
	  shadow: 'rgb(0, 0, 0)',
	  scrim: 'rgb(0, 0, 0)',
	  inverseSurface: 'rgb(42, 189, 248)',
	  inverseOnSurface: 'rgb(231, 239, 248)',
	  inversePrimary: 'rgb(42, 189, 248)',
	  elevation: {
		level0: 'transparent',
		level1: 'rgb(22, 27, 30)',
		level2: 'rgb(29, 35, 39)',
		level3: 'rgb(36, 42, 46)',
		level4: 'rgb(40, 47, 51)',
		level5: 'rgb(45, 52, 56)',
	  },
	  surfaceDisabled: 'rgba(255, 255, 255, 0.12)',
	  onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',
	  backdrop: 'rgba(0, 0, 0, 0.4)',
	  blue: 'blue',
	},
  };
  
  