import React, { useState } from 'react';

import { Close } from '../../icons/close';

import './search.scss';

export const Search = () => {
  const [showInput, setShowInput] = useState(false);

  return (
    <React.Fragment>
      <input className='search field' type='text' placeholder='Поиск книги или автора…' />
      <form className={`search__form-mobile ${showInput ? 'visible' : ''}`} action=''>
        <input
          data-test-id='input-search'
          className='field search-mobile'
          type='text'
          placeholder='Поиск книги или автора…'
        />
        <button
          data-test-id='button-search-close'
          type='button'
          aria-label='button'
          onClick={() => {
            setShowInput(false);
          }}
        >
          <Close />
        </button>
      </form>
      <button
        data-test-id='button-search-open'
        type='button'
        className='search-btn icon'
        aria-label='button'
        onClick={() => {
          setShowInput(true);
        }}
      />
    </React.Fragment>
  );
};
