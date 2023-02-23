import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import cat from '../../assets/icons/cat.svg';
import { RootState } from '../../store/store';

import './book.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Book = () => {
  const { book } = useSelector((state: RootState) => state.book);
  const { images, authors, issueYear, booking, title, description } = book;
  const day = String(booking?.dateOrder).slice(8, 10);
  const month = String(booking?.dateOrder).slice(5, 7);
  const [activeThumb, setActiveThumb] = useState<SwiperClass>();

  return (
    <div className='book-page__book book'>
      {images && images[1] ? (
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
            {images.map((img) => (
              <SwiperSlide key={img.url}>
                <img src={`https://strapi.cleverland.by${img.url}`} alt='book cover' className='book__cover' />
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
            {images.map((img) => (
              <SwiperSlide data-test-id='slide-mini' key={img.url} className='book__thumb-slide'>
                <img src={`https://strapi.cleverland.by${img.url}`} alt='book cover' className='book__cover' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : images && images[0] ? (
        <img src={`https://strapi.cleverland.by${images[0].url}`} alt='book cover' className='book__cover' />
      ) : (
        <div className='book__cover'>
          <img src={cat} alt='default cover' />
        </div>
      )}
      <div className='book__about'>
        <h3 className='book__title' data-test-id='book-title'>
          {title}
        </h3>
        <h5 className='book__info'>{`${authors}, ${issueYear}`}</h5>
        {booking?.order ? (
          <button type='button' disabled={true} className='btn book__book'>
            {`занята до ${day}.${month}`}
          </button>
        ) : (
          <button className='btn book__book' type='button'>
            забронировать
          </button>
        )}
      </div>
      <div className='book__descr'>
        <h5 className='book-page__title'>О книге</h5>
        {String(description)
          .split('\n')
          .map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
      </div>
    </div>
  );
};
