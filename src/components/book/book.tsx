import { useState } from 'react';
import { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import cat from '../../assets/icons/cat.svg';

import './book.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Book = ({
  image,
  author,
  year,
  isBooked,
  bookedTill,
  title,
}: {
  image: string[] | undefined;
  author: string;
  year: number;
  isBooked: boolean;
  bookedTill: string;
  title: string;
}) => {
  const [activeThumb, setActiveThumb] = useState<SwiperClass>();

  return (
    <div className='book-page__book book'>
      {image && image[1] ? (
        <div className='book__sliders'>
          <Swiper
            data-test-id='slide-big'
            className='book__slider'
            modules={[Navigation, Thumbs, Pagination]}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
            slidesPerView={1}
          >
            {image.map((img) => (
              <SwiperSlide key={img}>
                <img src={img} alt='book cover' className='book__cover' />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            className='book__thumb'
            onSwiper={setActiveThumb}
            modules={[Thumbs]}
            spaceBetween={30}
            slidesPerView={5}
            centerInsufficientSlides={true}
          >
            {image.map((img) => (
              <SwiperSlide data-test-id='slide-mini' key={img} className='book__thumb-slide'>
                <img src={img} alt='book cover' className='book__cover' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : image && image[0] ? (
        <img src={image[0]} alt='book cover' className='book__cover' />
      ) : (
        <div className='book__cover'>
          <img src={cat} alt='default cover' />
        </div>
      )}
      <div className='book__about'>
        <h3 className='book__title'>{title}</h3>
        <h5 className='book__info'>{`${author}, ${year}`}</h5>
        {isBooked ? (
          <button type='button' disabled={true} className='btn book__book'>
            {`занята до ${bookedTill.slice(8, 10)}.${bookedTill.slice(5, 7)}`}
          </button>
        ) : (
          <button className='btn book__book' type='button'>
            забронировать
          </button>
        )}
      </div>
      <div className='book__descr'>
        <h5 className='book-page__title'>О книге</h5>
        <p>
          Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
          решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить
          многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?
        </p>
        <p>
          Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
          алгоритмы — это веселое и увлекательное занятие.
        </p>
      </div>
    </div>
  );
};
