import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import cat from '../../../assets/icons/cat.svg';
import star from '../../../assets/icons/star.svg';
import starYellow from '../../../assets/icons/star-yellow.svg';
import { modifyTitle } from '../../../helpers/modify-title';
import { BookPreview } from '../../../interfaces/book-preview';
import { setIsError, setIsLoading } from '../../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../../store/store';
import { getBook } from '../../../store/thunks';

import { CardList } from './card-list/card-list';
import { CardTile } from './card-tile/card-tile';

import './card.scss';

export const Card = ({ book }: { book: BookPreview }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.book);
  const { display, search } = useSelector((state: RootState) => state.display);

  const { id, image, rating, title, authors, issueYear, booking } = book;

  const day = String(booking?.dateOrder).slice(8, 10);
  const month = String(booking?.dateOrder).slice(5, 7);

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

  const cardElements = {
    tile: <span className='card__title'>{search ? modifyTitle(title, search) : title}</span>,
    info: (
      <span className='card__info'>
        {authors}, {issueYear}
      </span>
    ),
    rating: (
      <div className='card__rating'>
        {rating ? (
          Array.from({ length: 5 }, (_, i) => i).map((point) => (
            <img src={point < Math.floor(rating) ? starYellow : star} alt='star' key={point} />
          ))
        ) : (
          <span>еще нет оценок</span>
        )}
      </div>
    ),
    order: (
      <button type='button' disabled={booking?.order ? true : false} className='card__book btn'>
        {booking?.order ? `занята до ${day}.${month}` : 'забронировать'}
      </button>
    ),
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
        <div className='card__wrapper'>
          {display === 'tile' ? <CardTile cardElements={cardElements} /> : <CardList cardElements={cardElements} />}
        </div>
      </NavLink>
    </li>
  );
};
