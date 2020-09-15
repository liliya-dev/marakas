import { AnyAction } from 'redux';
import { MovieFromServer } from '../interfaces';

const SET_MOVIES = 'SET_MOVIES';

export const setMovies = (movies: MovieFromServer) => ({ type: SET_MOVIES, payload: movies });

const reducer = (movies = [], action: AnyAction) => {
  switch (action.type) {
    case SET_MOVIES:
      localStorage.setItem('movies', JSON.stringify([...movies, ...action.payload]))
      return [...movies, ...action.payload]

    default:
      return movies;
  }
};

export default reducer;