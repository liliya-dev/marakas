import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import moviesReducer from './movies';
import historyReducer from './history';
import messageReducer from './message';
import loadingReducer from './isLoading';

const rootReducer = combineReducers({
  movies: moviesReducer,
  history: historyReducer,
  message: messageReducer,
  isLoading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const getMovies = (state: RootState) => state.movies;
export const getHistory = (state: RootState) => state.history;
export const getLoading = (state: RootState) => state.isLoading;
export const getMessage = (state: RootState) => state.message;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;