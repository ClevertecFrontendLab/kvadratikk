import { useSelector } from 'react-redux';

import star from '../../assets/icons/star.svg';
import starYellow from '../../assets/icons/star-yellow.svg';
import { RootState } from '../../store/store';

export const Rating = () => {
  const { book } = useSelector((state: RootState) => state.book);
  const { rating } = book;

  return (
    <div className='book-page__rating'>
      <h5 className='book-page__title'>Рейтинг</h5>
      <div>
        {rating && (
          <div className='stars'>
            {Array.from({ length: 5 }, (_, i) => i).map((point) => (
              <img src={point < Math.floor(rating) ? starYellow : star} alt='star' key={point} />
            ))}
          </div>
        )}
        <span className='average'>{rating || <span>еще нет оценок</span>}</span>
      </div>
    </div>
  );
};
