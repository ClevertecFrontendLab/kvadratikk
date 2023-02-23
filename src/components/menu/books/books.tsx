import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { setIsExpandedMenu, setShouldGenresHide } from '../../../store/slices/menu-slice';
import { AppDispatch, RootState } from '../../../store/store';
import { Down } from '../../icons/down';
import { Up } from '../../icons/up';

import './books.scss';

export const Books = ({ isBurgerMenu }: { isBurgerMenu?: boolean }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { genres, books, loading } = useSelector((state: RootState) => state.books);
  const { shouldGenresHide } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    if (!pathname.includes('/books/') && pathname !== '/') dispatch(setShouldGenresHide(true));
  }, [pathname, dispatch]);

  return (
    <li className='books'>
      <NavLink
        to='/books/all'
        data-test-id={isBurgerMenu ? 'burger-showcase' : 'navigation-showcase'}
        onClick={() => {
          if (pathname.includes('/books/')) dispatch(setShouldGenresHide(!shouldGenresHide));
        }}
      >
        <h5 className={pathname.includes('/books/') ? 'active' : ''}>
          Витрина книг
          {loading === 'succeeded' && shouldGenresHide ? <Down /> : <Up />}
        </h5>
      </NavLink>
      {loading === 'succeeded' && (
        <ul className={`books__list ${shouldGenresHide ? '' : 'expanded'}`}>
          <li>
            <NavLink
              data-test-id={isBurgerMenu ? 'burger-books' : 'navigation-books'}
              to='/books/all'
              onClick={() => {
                dispatch(setIsExpandedMenu(false));
              }}
            >
              <span className={`books__genre ${pathname === '/books/all' ? 'active' : ''}`}>Все книги</span>
            </NavLink>
          </li>
          {genres.map((genre) => (
            <li key={genre.id}>
              <NavLink
                to={`/books/${genre.path}`}
                onClick={() => {
                  dispatch(setIsExpandedMenu(false));
                }}
              >
                <span
                  data-test-id={isBurgerMenu ? `burger-${genre.path}` : `navigation-${genre.path}`}
                  className={`books__genre ${pathname === `/books/${genre.path}` ? 'active' : ''}`}
                >
                  {genre.name}
                </span>
                <span
                  className='books__quantity'
                  data-test-id={
                    isBurgerMenu ? `burger-book-count-for-${genre.path}` : `navigation-book-count-for-${genre.path}`
                  }
                >
                  {books.filter((book) => book.categories?.includes(genre.name)).length}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
