import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../store/store';

import { Card } from './card/card';
import { Filter } from './filter/filter';
import { Search } from './search/search';

import './content.scss';

export const Content = () => {
  const { category } = useParams();

  const [display, setDisplay] = useState('tile');
  const { books, genres } = useSelector((state: RootState) => state.books);

  return (
    <div className='content'>
      <div className='content__settings'>
        <Search />
        <Filter />
        <div className='content__display'>
          <button
            aria-label='button'
            data-test-id='button-menu-view-window'
            type='button'
            className={display === 'tile' ? 'tile icon active' : 'tile icon'}
            onClick={() => {
              setDisplay('tile');
            }}
          />
          <button
            aria-label='button'
            data-test-id='button-menu-view-list'
            type='button'
            className={display === 'list' ? 'list icon active' : 'list icon'}
            onClick={() => {
              setDisplay('list');
            }}
          />
        </div>
      </div>
      <ul className={display === 'tile' ? 'content__list' : 'content__list content__list-list'}>
        {books
          .filter((book) => {
            const curGenre = String(genres.find((genre) => genre.path === category)?.name);

            return category === 'all' ? book : book.categories.includes(curGenre);
          })
          .map((book) => {
            const { id, categories, title, rating, authors, issueYear, booking, image } = book;

            return (
              <Card
                key={id}
                id={id}
                categories={categories}
                title={title}
                authors={authors}
                rating={rating}
                issueYear={issueYear}
                isBooked={Boolean(booking?.order)}
                img={image?.url}
                bookedTill={String(booking?.dateOrder)}
                display={display}
              />
            );
          })}
      </ul>
    </div>
  );
};
