import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../../../helpers';
import { MovieWithDetails } from '../../../interfaces';
import styles from './MoviePage.module.scss';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

interface Props {
  id: string;
}

const override = css`
  display: block;
  margin: 40px auto;
`;

export const MoviePage: React.FC<Props> = ({ id }) => {
  const [movie, setMovie] = useState<MovieWithDetails | null>(null);
  useEffect(() => {
    const fetchMovies = async () => {
      const movieFromServer = await fetchMovie(id);
      setMovie(movieFromServer);
    }
  
    fetchMovies()
  }, [id]);

  return (
    <div className={styles.container}>
      {
        movie && <h1 className={styles.movie}>{movie.Title}</h1>
      } 
      {
        movie ? (
          <>
            <div className={styles.top}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className={styles.description}>
                <p><span className={styles.title}>Actors:</span> {movie.Actors}</p>
                <p><span className={styles.title}>Runtime:</span> {movie.Runtime}</p>
                <p><span className={styles.title}>Rating:</span> {movie.imdbRating}</p>
                <p><span className={styles.title}>Genre:</span> {movie.Genre}</p>
                <p><span className={styles.title}>Type:</span> {movie.Type}</p>
                <p><span className={styles.title}>Awards:</span> {movie.Awards}</p>
                <p><span className={styles.title}>Language:</span> {movie.Language}</p>
                <p><span className={styles.title}>Writer:</span> {movie.Writer}</p>
                <p><span className={styles.title}>Country:</span> {movie.Country}</p>
                <p><span className={styles.title}>Director:</span> {movie.Director}</p>
              </div>
            </div>
            <div className={styles.down}>
              <span className={styles.title}>Plot</span>
              <p>{movie.Plot}</p>
            </div>
          </>
        )
        : (
          <CircleLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={true}
          />
        )
      }
    </div>
  )
}