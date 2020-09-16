import React from 'react';
import { useSelector } from 'react-redux';
import { getHistory } from '../../../store';
import styles from './HistoryList.module.scss';

interface Props {
  setVisibility: () => (void);
  setNewValue: (request: string) => (void);
}

export const HistoryList: React.FC<Props> = ({ setVisibility, setNewValue }) => {
  const history: string[] = useSelector(getHistory);

  return (
    <div 
      className={styles.wrapper}
      onBlur={setVisibility}
    >
      <ul className={styles.history}>
        {
          history.length
          ? history.map(
            (query, index) => (
              <li 
                onClick={() => {
                  setVisibility();
                  setNewValue(query)
                }}
                key={Date.now() + index + query}
                className={styles.historyItem}
              >
                {query}
              </li>
            )
            )
          : <li className={styles.historyItem}>No requests yet</li>
        }
      </ul>
      <button 
        className={styles.button}
        type="button"
        onClick={setVisibility}
      >
        x
      </button>
    </div>
  )
}