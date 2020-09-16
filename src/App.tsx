import React from 'react';
import { MoviesPage } from './components/Pages/MoviesPage/MoviesPage';
import styles from './App.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MoviePage } from './components/Pages/MoviePage/MoviePage';
import './reset.scss';

export const App: React.FC = () => {

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Switch>
          <Route path="/" exact><Redirect to="/movies" /></Route>
          <Route path="/movies" exact component={MoviesPage} />
          <Route 
            path="/movies/:id" 
            render={({ match }) => <MoviePage id={match.params.id} />} 
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;