import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { Book } from '../../components/book/book';
import { Details } from '../../components/details/details';
import { Rating } from '../../components/rating/rating';
import { Reviews } from '../../components/reviews/reviews';
import { setIsError, setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';
import { getBook, getGenres } from '../../store/thunks';

import './book-page.scss';

export const BookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, id } = useParams();
  const { book, loading } = useSelector((state: RootState) => state.book);
  const { genres } = useSelector((state: RootState) => state.books);
  const { title } = book;
  const curGenre = genres.find((genre) => genre.path === category)?.name;

  useEffect(() => {
    if (loading === 'idle') {
      if (!genres.length) dispatch(getGenres());
      dispatch(getBook(String(id)));
      dispatch(setIsLoading(true));
    }
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') {
      dispatch(setIsError(true));
      dispatch(setIsLoading(false));
    }
    if (loading === 'succeeded') {
      dispatch(setIsLoading(false));
      dispatch(setIsError(false));
    }
  }, [dispatch, id, loading, genres]);

  return (
    <section className='book-page'>
      <div className='book-page__nav'>
        <div className='container'>
          <NavLink to={`/books/${category}`} data-test-id='breadcrumbs-link'>
            {category === 'all' ? 'Все книги' : curGenre}
          </NavLink>
          <span className='slash' />
          <span data-test-id='book-name'>{title}</span>
        </div>
      </div>
      {loading === 'succeeded' && (
        <div className='container'>
          <Book />
          <Rating />
          <Details />
          <Reviews />
        </div>
      )}
    </section>
  );
};
