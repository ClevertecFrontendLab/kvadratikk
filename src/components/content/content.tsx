import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setDisplay } from '../../store/slices/display-slice';
import { RootState } from '../../store/store';

import { Card } from './card/card';
import { Filter } from './filter/filter';
import { Search } from './search/search';

import './content.scss';

export const Content = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { books, genres } = useSelector((state: RootState) => state.books);
  const { display, sort } = useSelector((state: RootState) => state.display);

  const categoryBooks = books
    .filter((book) => {
      const curGenre = String(genres.find((genre) => genre.path === category)?.name);

      return category === 'all' ? book : book.categories?.includes(curGenre);
    })
    .sort((a, b) => {
      if (sort === 'desc') return Number(b.rating) - Number(a.rating);

      return Number(a.rating) - Number(b.rating);
    });

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
              dispatch(setDisplay('tile'));
            }}
          />
          <button
            aria-label='button'
            data-test-id='button-menu-view-list'
            type='button'
            className={display === 'list' ? 'list icon active' : 'list icon'}
            onClick={() => {
              dispatch(setDisplay('list'));
            }}
          />
        </div>
      </div>

      {categoryBooks.length ? (
        <ul className={display === 'tile' ? 'content__list' : 'content__list content__list-list'}>
          {categoryBooks.map((book) => (
            <Card key={book.id} book={book} display={display} />
          ))}
        </ul>
      ) : (
        <h3 className='not-detected'>В этой категории книг ещё нет</h3>
      )}
    </div>
  );
};
