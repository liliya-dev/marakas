import React from 'react';
import { setPages } from '../../helpers';
import styles from './Pagination.module.scss';

interface Props {
  quantity: number;
  changePage: (pageNumber: number) => (void);
  activePage: number;
}

export const Pagination: React.FC<Props> = ({ quantity, changePage, activePage }) => {
  const pages = setPages(quantity);

  return (
    <ul className={styles.container}>
      {
        pages.map(page => (
          <button 
            key={page}
            type="button" 
            onClick={() => changePage(page)}
            className={page === activePage
                ? `${styles.buttonActive} ${styles.button}`
                : `${styles.buttonNonActive} ${styles.button}`}
          >
            {page}
          </button>
        ))
      }
    </ul>
  )
}