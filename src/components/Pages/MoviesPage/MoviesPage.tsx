import React, { useEffect, useMemo, useState } from 'react';
import { MovieCard } from '../../MovieCard/MovieCard';
import { MovieFromServer } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { getLoading, getMessage, getMovies } from '../../../store';
import styles from './MoviesPage.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { Pagination } from '../../Pagination/Pagination';
import { sortList } from '../../../helpers';
import { TopBar } from '../../TopBar/TopBar';
import { Input } from '../../Input/Input';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 40px auto;
`;

export const MoviesPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page: string = searchParams.get('page') || '1';
  const genre: string = searchParams.get('genre') || 'All';
  const sortBy: string = searchParams.get('sortBy') || 'title';
  const order: string = searchParams.get('order') || 'forward';
  const movies: MovieFromServer[] = useSelector(getMovies);
  const [filteredList, setFilteredLIst] = useState<MovieFromServer[]>([]);
  const [sortedList, setSortedList] = useState<MovieFromServer[]>(filteredList);
  const [startIndex, setStartIndex] = useState(+page * 8 - 8);
  const [lastIndex, setLastIndex] = useState(+page * 8);
  const [activePage, setActivePage] = useState(page);
  const message = useSelector(getMessage);
  const isLoading = useSelector(getLoading);

  const content = isLoading && !movies.length 
    ? (<CircleLoader
      css={override}
      size={150}
      color={"#123abc"}
      loading={true}
    />)
    :  <p>{message}</p>;

  useEffect(() => {
    setFilteredLIst(movies);
  }, [movies]);

  useMemo(() => {
    const updatedList = sortList(filteredList, sortBy, order);
    setSortedList(updatedList);
  }, [sortBy, order, filteredList]);

  useEffect(() => {
    let temporaryPage = +page;
    if (+page > Math.ceil(sortedList.length / 8)) {
      temporaryPage = Math.ceil(sortedList.length / 8);
    }
    setActivePage(`${temporaryPage}`);
    setStartIndex(8 * (temporaryPage - 1));
    setLastIndex(8 * (temporaryPage - 1) + 8);
  }, [page, sortedList.length]);

  useEffect(() => {
    switch (genre) {
      case 'All':
        setFilteredLIst(movies);
        break;
      case 'Movie':
      case 'Series':
        setFilteredLIst(movies.filter(movie => movie.Type === genre.toLowerCase()));
        break;
    }
  }, [genre, movies]);

  const changePage = (pageNumber: number) => {
    let temporaryPage = pageNumber;
    if (pageNumber > Math.ceil(filteredList.length / 8)) {
      temporaryPage = Math.ceil(filteredList.length / 8);
    }
    setStartIndex(8 * (temporaryPage - 1))
    setLastIndex(8 * (temporaryPage - 1) + 8)
    searchParams.set('page', `${temporaryPage}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const setFilterOption = (option: string, type: string) => {
    searchParams.set(`${type}`, `${option}`);
    history.push({
      search: searchParams.toString(),
    });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movies list</h1>
      <Input setFilterOption={setFilterOption}/>
      <TopBar 
        order={order} 
        setFilterOption={setFilterOption} 
        sortBy={sortBy}
        genre={genre}
      />
      {
        movies.length 
          ? (
            <>
              <div className={styles.list}>
                {sortedList.slice(startIndex, lastIndex).map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
              <Pagination 
                changePage={changePage} 
                quantity={Math.ceil(sortedList.length / 8)} 
                activePage={+activePage}
              />
            </>
          )
          : content
      }
    </div>
  );
}