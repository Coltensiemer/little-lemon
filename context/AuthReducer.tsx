import { View, Text } from 'react-native'
import React, {useReducer} from 'react'
import { notifications } from './AuthContext'


export enum ReducerActions { 
	setUser,
	clearUser
}

type setContextUser = { 
	type: ReducerActions.setUser,
	payLoad: string
}

type clearContextUser ={ 
	type: ReducerActions.clearUser,
}

type ConfigActionType = setContextUser | clearContextUser

// export const ContextReducer = ( 
// 	state: notifications,
// 	action: ConfigActionType
// )