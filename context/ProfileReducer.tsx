

  export enum ReducerAction {
	setFirstName,
	setLastName,
	setDarkMode,
	setSpecialOffers,
	setNewsLetters,
	resetProfile,
  }

export interface ProfileState {
	first_name: string,
	last_name: string,
	dark_mode: boolean,
	special_offers: boolean,
	news_letters: boolean 
}


export function init(state: ProfileState) { 
	return { 
		first_name: state.first_name,
		last_name: state.last_name,
		dark_mode: state.dark_mode,
		special_offers: state.special_offers,
		news_letters: state.news_letters
	}
}


type ProfileAction =  
	{ type: ReducerAction.setFirstName; payload: string }
  | { type: ReducerAction.setLastName; payload: string }
  | { type: ReducerAction.setDarkMode; payload: boolean }
  | { type: ReducerAction.setSpecialOffers; payload: boolean }
  | { type: ReducerAction.setNewsLetters; payload: boolean } 
  | { type: ReducerAction.resetProfile; payload: ProfileState } 

		export const ProfileReducer = (state: ProfileState, action: ProfileAction): ProfileState => {
  switch (action.type) {
	  case ReducerAction.setFirstName:
		return {
		  ...state,
		  first_name: action.payload,
		};
	  case ReducerAction.setLastName:
		return {
		  ...state,
		  last_name: action.payload,
		};
	  case ReducerAction.setDarkMode:
		return {
		  ...state,
		  dark_mode: action.payload,
		};
	  case ReducerAction.setSpecialOffers:
		return {
		  ...state,
		  special_offers: action.payload,
		};
	  case ReducerAction.setNewsLetters:
		return {
		  ...state,
		  news_letters: action.payload,
		};
	  case ReducerAction.resetProfile:
		return  init(action.payload)
	  default:
		return state;
	}
  };
  