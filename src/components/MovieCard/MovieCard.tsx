import React from 'react';
import { NavLink } from 'react-router-dom';
import { MovieFromServer } from '../../interfaces';
import styles from './MovieCard.module.scss';

interface Props {
  movie: MovieFromServer;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {

  return (
    <NavLink to={`movies/${movie.imdbID}`} className={styles.container}>
      <img
        className={styles.image}
        src={movie.Poster}
        alt="Film logo"
      />
      <h3>{movie.Title}</h3>
      <div className="card-content">
        <div className="content">
          <p>{movie.Type}</p>
          <p>{movie.Year}</p>
        </div>
      </div>
    </NavLink>
  );
};