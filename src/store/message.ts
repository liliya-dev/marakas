import { AnyAction } from 'redux';

const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = (value: string) => ({ type: SET_MESSAGE, payload: value });

const reducer = (message = 'No results yet', action: AnyAction) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload;
    
    default:
      return message;
  }
};

export default reducer;