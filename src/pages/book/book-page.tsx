import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Book } from '../../components/book/book';
import { Details } from '../../components/details/details';
import { Rating } from '../../components/rating/rating';
import { Reviews } from '../../components/reviews/reviews';
import { setIsError, setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';
import { getBook } from '../../store/thunks';

import './book-page.scss';

export const BookPage = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { book, loading } = useSelector((state: RootState) => state.book);
  const { title, categories } = book;

  useEffect(() => {
    if (loading === 'idle') {
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
  }, [dispatch, id, loading]);

  return (
    <section className='book-page'>
      <div className='book-page__nav'>
        <div className='container'>
          <span>{category === 'all' ? 'Все книги' : categories}</span>
          <span className='slash' />
          <span>{title}</span>
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
