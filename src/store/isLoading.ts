import { AnyAction } from 'redux';

const SET_LOADING = 'SET_LOADING';

export const setLoading = (value: boolean) => ({ type: SET_LOADING, payload: value });

const reducer = (loading = false, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    
    default:
      return loading;
  }
};

export default reducer;