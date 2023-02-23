import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSearch } from '../../../store/slices/display-slice';
import { Close } from '../../icons/close';
import { SearchIcon } from '../../icons/search-icon';

import './search.scss';

export const Search = () => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);

  const changeSearch = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

    dispatch(setSearch(value));
  };

  return (
    <React.Fragment>
      <div className={`search__wrapper ${showInput ? 'visible' : ''}`}>
        <input
          data-test-id='input-search'
          className='search field'
          type='search'
          placeholder='Поиск книги или автора…'
          onChange={changeSearch}
        />
        <SearchIcon />
        <button
          data-test-id='button-search-close'
          type='button'
          aria-label='button'
          className='search__close'
          onClick={() => {
            setShowInput(false);
          }}
        >
          {showInput && <Close />}
        </button>
      </div>
      <button
        data-test-id='button-search-open'
        type='button'
        className='search__open icon'
        aria-label='button'
        onClick={() => {
          setShowInput(true);
        }}
      >
        <SearchIcon />
      </button>
    </React.Fragment>
  );
};
