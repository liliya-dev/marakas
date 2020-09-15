import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MoviesPage } from './components/Pages/MoviesPage/MoviesPage';
import { fetchData } from './helpers';
import { setMovies } from './store/movies';
import styles from './App.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MoviePage } from './components/Pages/MoviePage/MoviePage';
let arr = ['father', 'mother', 'friends', 'brother', 'sister'];

export const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const downloadedLIst = JSON.parse(localStorage.getItem('movies') || '');
      dispatch(setMovies(downloadedLIst));
    } else {
      const fetchMovies = async () => {
        arr.forEach(async item => {
          const searchList = await fetchData(item)
          dispatch(setMovies(searchList))
        })
      }
      fetchMovies()
    }
  }, [])

  return (
    <div className={styles.container}>
       <Switch>
        <Route path="/" exact component={MoviesPage} />
        <Route path="/movies" exact><Redirect to="/" /></Route>
        <Route 
          path="/movies/:id" 
          render={({ match }) => <MoviePage id={match.params.id} />} 
        />
      </Switch>
    </div>
  );
};

export default App;