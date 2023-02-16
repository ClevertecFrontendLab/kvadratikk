import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Content } from '../../components/content/content';
import { Error } from '../../components/error/error';
import { Loader } from '../../components/loader/loader';
import { Menu } from '../../components/menu/menu';
import { getBooks, getGenres } from '../../store/slices/books-slice';
import { AppDispatch, RootState } from '../../store/store';

import './main-page.scss';

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getGenres());
      dispatch(getBooks());
    }
  }, [dispatch, loading]);

  return (
    <section className='main-page'>
      {loading === 'pending' && <Loader />}
      {loading === 'failed' && (
        <div className='container'>
          <Error />
        </div>
      )}
      <div className='container'>
        <Menu />
        {loading === 'succeeded' && <Content />}
      </div>
    </section>
  );
};
