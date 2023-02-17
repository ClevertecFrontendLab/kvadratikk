import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

export const Details = () => {
  const { book } = useSelector((state: RootState) => state.book);
  const { publish, issueYear, pages, cover, format, weight, categories, ISBN, producer } = book;

  const list1 = [
    { title: 'Издательство', descr: publish },
    { title: 'Год издания', descr: issueYear },
    { title: 'Страниц', descr: pages },
    { title: 'Переплёт', descr: cover },
    { title: 'Формат', descr: format },
  ];

  const list2 = [
    { title: 'Жанр', descr: categories },
    { title: 'Вес', descr: weight },
    { title: 'ISBN', descr: ISBN },
    { title: 'Изготовитель', descr: producer },
  ];

  return (
    <div className='book-page__details'>
      <h5 className='book-page__title'>Подробная информация</h5>
      <div>
        <ul>
          {list1.map((el) => (
            <li key={el.title}>
              <span className='title'>{el.title}</span>
              <span className='descr'>{el.descr}</span>
            </li>
          ))}
        </ul>
        <ul>
          {list2.map((el) => (
            <li key={el.title}>
              <span className='title'>{el.title}</span>
              <span className='descr'>{el.descr}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
