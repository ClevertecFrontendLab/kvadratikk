import React from 'react';

import star from '../../../../assets/icons/star.svg';
import starYellow from '../../../../assets/icons/star-yellow.svg';
import { BookPreview } from '../../../../interfaces/book-preview';

export const CardTile = ({ book }: { book: BookPreview }) => {
  const { rating, title, authors, issueYear, booking } = book;
  const day = String(booking?.dateOrder).slice(8, 10);
  const month = String(booking?.dateOrder).slice(5, 7);

  return (
    <React.Fragment>
      <div className='card__rating'>
        {rating ? (
          Array.from({ length: 5 }, (_, i) => i).map((point) => (
            <img src={point < Math.floor(rating) ? starYellow : star} alt='star' key={point} />
          ))
        ) : (
          <span>еще нет оценок</span>
        )}
      </div>
      <span className='card__title'>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</span>
      <span className='card__info'>
        {authors}, {issueYear}
      </span>
      {booking?.order ? (
        <button type='button' disabled={true} className='card__book btn'>
          {`занята до ${day}.${month}`}
        </button>
      ) : (
        <button type='button' className='card__book btn'>
          забронировать
        </button>
      )}
    </React.Fragment>
  );
};
