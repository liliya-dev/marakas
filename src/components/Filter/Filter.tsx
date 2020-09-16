import React, { useState } from 'react';
import styles from './Filter.module.scss';
import arrow from './arrow.png';

interface Props {
  options: string[];
  currentOption: string;
  setFilterOption: (option: string, type: string) => (void);
  type: string;
}

export const Filter: React.FC<Props> = ({ 
  options, currentOption, setFilterOption, type 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
   <button className={styles.container} onBlur={() => setIsVisible(false)}>
     <p>{type === 'genre' ? 'Choose the genre' : 'Sort by'}</p>
    <div 
      className={styles.header}
      onClick={() => setIsVisible(!isVisible)}
    >
      <p>{currentOption}</p>
      <img className={styles.image} src={arrow} alt=""/>
    </div>
      {
       isVisible && (
        <ul className={styles.list}>
          {
            options
              .filter(option => option !== currentOption)
              .map(option => (
                <li 
                  className={styles.item}
                  key={option}
                  onClick={() => {
                    setFilterOption(option, type);
                    setIsVisible(!isVisible);
                  }}
                >
                  {option}
                </li>
              ))
            }
          </ul>
       )
     }
   </button>
  )
}