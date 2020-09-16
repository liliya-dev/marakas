import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, fetchDataWithPage, setPages } from '../../helpers';
import { removeMovies, setMovies } from '../../store/movies';
import styles from './Input.module.scss';
import history from './history.png';
import { HistoryList } from './History/HistoryList';
import { setQuery } from '../../store/history';
import { setMessage } from '../../store/message';
import { setLoading } from '../../store/isLoading';

interface Props {
  setFilterOption: (option: string, type: string) => (void);
}

export const Input: React.FC<Props> = ({ setFilterOption }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const dispatch = useDispatch();

  const handleClick = async () => {
    if (value.trim().length < 3) {
      setError('Please enter more than 3 letters')
    }
    else {
      dispatch(setQuery(value));
      dispatch(removeMovies());
      dispatch(setLoading(true));
      try {
        const data = await fetchData(value);
        dispatch(setMessage(''));
        if (data.Search) {
          const pageQuantity = (+data.totalResults / 10 >= 10) ? 10 : Math.ceil(+data.totalResults / 10);
          const pagesList = setPages(pageQuantity);
          pagesList.forEach(async page => {
            const data = await fetchDataWithPage(value, page);  
            dispatch(setMovies(data.Search));
          });
        } else {
          dispatch(setMessage(`There are no movies with ${value} title`))
        }
        setValue(''); 
      }
      catch(err) {
        dispatch(setMessage('Something went wrong, please try again'))
      }
      finally {
        setFilterOption('1', 'page');
        dispatch(setLoading(false));
      }
    }
  };

  const setVisibility = () => {
    setIsHistoryVisible(false);
  };

  const setNewValue = (request: string) => {
    setValue(request);
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <input 
          className={styles.input}
          placeholder="Enter the title"
          value={value} 
          onChange={(ev) => {
            setValue(ev.target.value)
            setError('');
          }} 
          type="text"
        />
        <span 
          className={styles.historyButton}
          onClick={() => setIsHistoryVisible(true)}
        >
          <img src={history} alt="history"/>
        </span>
        <button 
          className={styles.search}
          type="button"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
      <p>{error}</p>
      {
        isHistoryVisible && (
          <HistoryList setNewValue={setNewValue}setVisibility={setVisibility} />
        )
      }
    </div>
    
  )
}