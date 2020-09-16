import { AnyAction } from 'redux';
import { MovieFromServer } from '../interfaces';

const SET_MOVIES = 'SET_MOVIES';
const REMOVE_MOVIES = 'REMOVE_MOVIES';

export const setMovies = (movies: MovieFromServer) => ({ type: SET_MOVIES, payload: movies });
export const removeMovies = () => ({ type: REMOVE_MOVIES });

let initialState: MovieFromServer[] = [];
if (localStorage.getItem('movies')) {
  initialState = JSON.parse(localStorage.getItem('movies') || '');
}

const reducer = (movies = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_MOVIES:
      localStorage.setItem('movies', JSON.stringify([...movies, ...action.payload]))
      return [...movies, ...action.payload];
    case 'REMOVE_MOVIES':
      localStorage.removeItem('movies')
      return [];

    default:
      return movies;
  }
};

export default reducer;