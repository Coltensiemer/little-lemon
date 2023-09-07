export enum ReducerAction {
  setVisibleTime,
  setVisibleDate,
  SubmitData,
}

export interface ReservationState {
  partySize: number;
  date: string;
  time: string;
  isVisibleTime: boolean;
  isVisibleDate: boolean;
}


type ReservationAction =
  | { type: ReducerAction.SubmitData; payload: any }
  | { type: ReducerAction.setVisibleDate; payload: any }
  | { type: ReducerAction.setVisibleTime; payload: boolean }

export const ReservationReducer = (
  state: ReservationState,
  action: ReservationAction
) => {
  switch (action.type) {
    case ReducerAction.SubmitData:
      return {
        ...state,
        setVisibleModal: action.payload,
      };
	  case ReducerAction.setVisibleDate:
	  return { 
		...state,
		isVisibleDate: action.payload
	  }
    default:
      return state;
  }
};
