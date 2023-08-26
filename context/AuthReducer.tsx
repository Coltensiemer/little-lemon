import { View, Text } from 'react-native'
import React, {useReducer} from 'react'
import {  ContextState } from './AuthContext'


// Data of set named values
export enum ReducerActions { 
 	logIn, 
	logOut
} 


type logIn = { 
	type: ReducerActions.logIn,
	payLoad: any
}

type logOut={ 
	type: ReducerActions.logOut,
}


type ConfigActionType = logIn | logOut

export const ContextReducer = ( 
	state: ContextState,
	action: ConfigActionType
): ContextState => { 
	switch(action.type) { 
		case ReducerActions.logIn: 
		return { 
			...state, 
			isUserData: action.payLoad, 
			isloading: action.payLoad, 
			istoken: action.payLoad,


		}
	case ReducerActions.logOut: 
	return { 
		...state, 
		isUserData: {},
		isloading:  false,
		istoken: "",
		userSettings: { 
			darkmode: false,
			specialOffers: false,
			newsletters: false, 
		}
	}

	}
}