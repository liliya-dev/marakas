import { AnyAction } from 'redux';

const SET_QUERY = 'SET_QUERY';

export const setQuery = (query: string) => ({ type: SET_QUERY, payload: query });

let initialState: string[] = [];
if (localStorage.getItem('history')) {
  initialState = JSON.parse(localStorage.getItem('history') || '');
}

const reducer = (history = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_QUERY:
      localStorage.setItem('history', JSON.stringify([...history, action.payload]))
      return [...history, action.payload];

    default:
      return history;
  }
};

export default reducer;