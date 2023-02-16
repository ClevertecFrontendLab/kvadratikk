import React from 'react';
import { NavLink } from 'react-router-dom';

import cat from '../../../assets/icons/cat.svg';
import star from '../../../assets/icons/star.svg';
import starYellow from '../../../assets/icons/star-yellow.svg';

import './card.scss';

type Props = {
  img: string | undefined;
  rating: number;
  title: string;
  authors: string[];
  issueYear: string;
  isBooked: boolean;
  bookedTill: string;
  id: number;
  categories: string[];
  display: string;
};

export const Card = (props: Props) => {
  const { img, rating, title, authors, issueYear, isBooked, bookedTill, id, categories, display } = props;

  return (
    <li className='card' data-test-id='card'>
      <NavLink to={`/books/${categories[0]}/${id}`}>
        {img ? (
          <img src={`https://strapi.cleverland.by${img}`} alt='book cover' className='card__cover' />
        ) : (
          <div className='card__cover'>
            <img src={cat} alt='default cover' />
          </div>
        )}
        <div className='card__wrapper'>
          {display === 'tile' ? (
            <React.Fragment>
              <div className='card__rating'>
                {rating ? (
                  Array.from({ length: 5 }, (_, i) => i).map((point) => (
                    <img src={point < rating ? starYellow : star} alt='star' key={point} />
                  ))
                ) : (
                  <span>еще нет оценок</span>
                )}
              </div>
              <span className='card__title'>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</span>
              <span className='card__info'>
                {authors[0]}, {issueYear}
              </span>
              {isBooked ? (
                <button type='button' disabled={true} className='card__book btn'>
                  {`занята до ${bookedTill.slice(8, 10)}.${bookedTill.slice(5, 7)}`}
                </button>
              ) : (
                <button type='button' className='card__book btn'>
                  забронировать
                </button>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className='card__title'>{title}</span>
              <span className='card__info'>
                {authors[0]}, {issueYear}
              </span>
              <div className='card__flex'>
                <div className='card__rating'>
                  {rating ? (
                    Array.from({ length: 5 }, (_, i) => i).map((point) => (
                      <img src={point < rating ? starYellow : star} alt='star' key={point} />
                    ))
                  ) : (
                    <span>еще нет оценок</span>
                  )}
                </div>
                {isBooked ? (
                  <button type='button' disabled={true} className='card__book btn'>
                    {`занята до ${bookedTill.slice(8, 10)}.${bookedTill.slice(5, 7)}`}
                  </button>
                ) : (
                  <button type='button' className='card__book btn'>
                    забронировать
                  </button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </NavLink>
    </li>
  );
};
