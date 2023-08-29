import { View, Text } from 'react-native'
import React, {useReducer} from 'react'
import {  ContextState } from './AuthContext'


// Data of set named values
export enum ReducerActions { 
 	logIn, 
	logOut,
	loggedIn
} 


type logIn = { 
	type: ReducerActions.logIn,
	payload: any
}

type logOut={ 
	type: ReducerActions.logOut,
}

type loggedIn = { 
	type: ReducerActions.loggedIn
	payload: any
}


type ConfigActionType = logIn | logOut | loggedIn

export const ContextReducer = ( 
	state: ContextState,
	action: ConfigActionType
): ContextState => { 
	switch(action.type) { 
		case ReducerActions.logIn: 
		return { 
			...state, 
			isUserData: action.payload, 
			isloading: action.payload, 
			istoken: action.payload,


		}
	case ReducerActions.logOut: 
	return { 
		...state, 
		isUserData: {},
		isloading:  false,
		istoken: null,
	}
	case ReducerActions.loggedIn: 
	return { 
		...state,
		istoken: action.payload,
		isloading: action.payload,



	}


	default: 
	return state; 

	}
}