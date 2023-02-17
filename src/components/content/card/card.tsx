import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import cat from '../../../assets/icons/cat.svg';
import { BookPreview } from '../../../interfaces/book-preview';
import { setIsError, setIsLoading } from '../../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../../store/store';
import { getBook } from '../../../store/thunks';

import { CardList } from './card-list/card-list';
import { CardTile } from './card-tile/card-tile';

import './card.scss';

export const Card = ({ display, book }: { display: string; book: BookPreview }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.book);

  const { id, image } = book;

  const [isCardClick, setIsCardClick] = useState(false);

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') {
      dispatch(setIsError(true));
      dispatch(setIsLoading(false));
    }
    if (loading === 'succeeded') {
      dispatch(setIsLoading(false));
      dispatch(setIsError(false));
    }
    if ((loading === 'succeeded' || loading === 'failed') && isCardClick) {
      navigate(`/books/${category}/${id}`);
      setIsCardClick(false);
    }
  }, [category, dispatch, id, isCardClick, loading, navigate, setIsCardClick]);

  const clickCard = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(getBook(String(id)));
    setIsCardClick(true);
  };

  return (
    <li className='card' data-test-id='card'>
      <NavLink to={`/books/${category}/${id}`} onClick={clickCard}>
        {image ? (
          <img src={`https://strapi.cleverland.by${image.url}`} alt='book cover' className='card__cover' />
        ) : (
          <div className='card__cover'>
            <img src={cat} alt='default cover' />
          </div>
        )}
        <div className='card__wrapper'>{display === 'tile' ? <CardTile book={book} /> : <CardList book={book} />}</div>
      </NavLink>
    </li>
  );
};
