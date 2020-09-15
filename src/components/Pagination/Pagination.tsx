import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  quantity: number;
  changePage: (pageNumber: number) => (void);
  activePage: number;
}

function setPages(quantity: number) {
  const pagesList = [];
  for (let i = 0; i < quantity; i++) {
    pagesList.push(i + 1)
  }
  return pagesList;
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
            className={page === activePage ? styles.buttonActive : styles.buttonNonActive}
          >
            {page}
          </button>
        ))
      }
    </ul>
  )
}