import React from 'react';
import { Filter } from '../Filter/Filter';
import up from './up.png';
import down from './down.png';
import { Search } from '../Search/Search';
import styles from './TopBar.module.scss';

interface Props {
  genre: string;
  sortBy: string;
  order: string;
  setFilterOption: (option: string, type: string) => (void);
  query: string;
}

export const TopBar: React.FC<Props> = ({ 
  genre, setFilterOption, sortBy, order, query
}) => {
  return (
    <div className={styles.container}>
      <Filter 
        options={['All', 'Movie', 'Series']}
        currentOption={genre}
        setFilterOption={setFilterOption}
        type='genre'
      />
      <Filter 
        options={['title', 'year']}
        currentOption={sortBy}
        setFilterOption={setFilterOption}
        type='sortBy'
      />
      <Search query={query} setFilterOption={setFilterOption} />
      <button 
        className={styles.button}
        type="button"
        onClick={() => {
          if (order === 'forward') {
            setFilterOption('reverse', 'order');
          } else {
            setFilterOption('forward', 'order');
          }
        }}
      >
        <img src={order === 'reverse' ? up : down} alt="order"/>
      </button>
    </div>
  )
}