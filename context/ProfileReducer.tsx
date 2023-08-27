
import { AuthContext, useAuthContext } from "./AuthContext";
import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	useReducer,
	Context,
  } from 'react';





export enum ReducerAction { 
	setProfile,
	resetProfile
}

export interface ProfileState {
	first_name: string,
	last_name: string,
	dark_mode: boolean,
	special_offers: boolean,
	news_letters: boolean 
}




type SetProfile = { 
	type: ReducerAction.setProfile,
	payload: any
}

type resetProfile = { 
	type: ReducerAction.resetProfile,
}

type configActionType = SetProfile | resetProfile


export const ProfileReducer = (state: ProfileState, action: configActionType): ProfileState => { 


	switch (action.type) { 
		case (ReducerAction.setProfile): 
		return { 
			...state,
			first_name: action.payload,
			last_name: action.payload,
			dark_mode: action.payload,
			special_offers: action.payload,
			news_letters: action.payload,

		}
		case (ReducerAction.resetProfile): 
		return { 
			...state,
			first_name: "",
			last_name: "",
			dark_mode: false,
			special_offers: false,
			news_letters: false,

		}
		
		default: 
		return state; 
	}
} 