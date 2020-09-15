import React from 'react';
import styles from './Search.module.scss';

interface Props {
  setFilterOption: (option: string, type: string) => (void);
  query: string;
}

export const Search: React.FC<Props> = ({ query, setFilterOption }) => {

  return (
    <input 
      placeholder="Enter the title"
      className={styles.input}
      type="text"
      value={query}
      onChange={ev => setFilterOption(ev.target.value, 'query')}
    />
  )
}