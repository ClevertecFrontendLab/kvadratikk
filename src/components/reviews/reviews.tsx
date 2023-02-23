import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as Down } from '../../assets/icons/down.svg';
import { ReactComponent as Up } from '../../assets/icons/up.svg';
import { RootState } from '../../store/store';

import { Review } from './review/review';

import './reviews.scss';

export const Reviews = () => {
  const { book } = useSelector((state: RootState) => state.book);
  const { comments } = book;
  const [isExpandedReviws, setIsExpandedReviews] = useState(true);

  return (
    <div className='reviews'>
      <h5 className='book-page__title'>
        Отзывы <span>{comments?.length}</span>
        <button
          data-test-id='button-hide-reviews'
          type='button'
          className='reviews__control'
          onClick={() => {
            setIsExpandedReviews(!isExpandedReviws);
          }}
        >
          {isExpandedReviws ? <Up /> : <Down />}
        </button>
      </h5>

      {comments && isExpandedReviws ? (
        <ul>
          {comments.map((comment) => {
            const { id, rating, text, createdAt, user } = comment;

            return <Review key={id} rating={rating} text={String(text)} createdAt={createdAt} user={user} />;
          })}
        </ul>
      ) : (
        ''
      )}

      <button data-test-id='button-rating' type='button' className='btn reviews__rate'>
        оценить книгу
      </button>
    </div>
  );
};
