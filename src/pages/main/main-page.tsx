import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Content } from '../../components/content/content';
import { Menu } from '../../components/menu/menu';
import { setIsError, setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';
import { getBooks, getGenres } from '../../store/thunks';

import './main-page.scss';

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getGenres());
      dispatch(getBooks());
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
  }, [dispatch, loading]);

  return (
    <section className='main-page'>
      <div className='container'>
        <Menu />
        {loading === 'succeeded' && <Content />}
      </div>
    </section>
  );
};
