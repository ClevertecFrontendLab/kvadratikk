import { useState } from 'react';

import star from '../../assets/icons/star.svg';
import starYellow from '../../assets/icons/star-yellow.svg';
import user from '../../assets/images/user.png';
import { Down } from '../icons/down';
import { Up } from '../icons/up';

import './reviews.scss';

export const Reviews = ({ rating }: { rating: number }) => {
  const [isExpandedReviws, setIsExpandedReviews] = useState(true);

  return (
    <div className='reviews'>
      <h5 className='book-page__title'>
        Отзывы <span>{rating ? 3 : 0}</span>
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

      {rating && isExpandedReviws ? (
        <ul>
          <li>
            <div className='user'>
              <img src={user} alt='user' />
              <span>Иван Иванов</span>
              <span>5 января 2019</span>
            </div>
            <div className='stars'>
              {Array.from({ length: 5 }, (_, i) => i).map((point) => (
                <img src={point < rating ? starYellow : star} alt='star' key={point} />
              ))}
            </div>
          </li>
          <li>
            <div className='user'>
              <img src={user} alt='user' />
              <span>Николай Качков</span>
              <span>20 июня 2018</span>
            </div>
            <div className='stars'>
              {Array.from({ length: 5 }, (_, i) => i).map((point) => (
                <img src={point < rating ? starYellow : star} alt='star' key={point} />
              ))}
            </div>
            <p>
              Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет
              шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик
              предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как
              уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени
              предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт
              предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний,
              инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит
              несомненную пользу обществу.
            </p>
          </li>
          <li>
            <div className='user'>
              <img src={user} alt='user' />
              <span>Екатерина Беляева</span>
              <span>18 февраля 2018</span>
            </div>
            <div className='stars'>
              {Array.from({ length: 5 }, (_, i) => i).map((point) => (
                <img src={point < rating ? starYellow : star} alt='star' key={point} />
              ))}
            </div>
          </li>
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
