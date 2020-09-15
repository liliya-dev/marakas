import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import moviesReducer from './movies';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const getMovies = (state: RootState) => state.movies;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;