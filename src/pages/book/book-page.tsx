import { useParams } from 'react-router-dom';

import star from '../../assets/icons/star.svg';
import starYellow from '../../assets/icons/star-yellow.svg';
import { Book } from '../../components/book/book';
import { Reviews } from '../../components/reviews/reviews';

import './book-page.scss';

export const BookPage = () => {
  const { id, category } = useParams();
  //   const activeBook = books[category as keyof typeof books].find((book) => book.id === id) as BookItem;
  //   const { rating, image, author, title, year, isBooked, bookedTill } = activeBook;

  return <p>d</p>;

  //   return (
  //     <section className='book-page'>
  //       <div className='book-page__nav'>
  //         <div className='container'>
  //           {/* <span>{genres[category as keyof typeof genres]}</span> */}
  //           <span className='slash' />
  //           <span>{title}</span>
  //         </div>
  //       </div>
  //       <div className='container'>
  //         <Book image={image} author={author} year={year} isBooked={isBooked} bookedTill={bookedTill} title={title} />

  //         <div className='book-page__rating'>
  //           <h5 className='book-page__title'>Рейтинг</h5>
  //           <div>
  //             <div className='stars'>
  //               {Array.from({ length: 5 }, (_, i) => i).map((point) => (
  //                 <img src={point < rating ? starYellow : star} alt='star' key={point} />
  //               ))}
  //             </div>
  //             <span className='average'>{rating || <span>еще нет оценок</span>}</span>
  //           </div>
  //         </div>

  //         <div className='book-page__details'>
  //           <h5 className='book-page__title'>Подробная информация</h5>
  //           <div>
  //             <ul>
  //               <li>
  //                 <span className='title'>Издательство</span>
  //                 <span className='descr'>Питер</span>
  //               </li>
  //               <li>
  //                 <span className='title'>Год издания</span>
  //                 <span className='descr'>2019</span>
  //               </li>
  //               <li>
  //                 <span className='title'>Страниц</span>
  //                 <span className='descr'>288</span>
  //               </li>
  //               <li>
  //                 <span className='title'>Переплёт</span>
  //                 <span className='descr'>Мягкая обложка</span>
  //               </li>
  //               <li>
  //                 <span className='title'>Формат</span>
  //                 <span className='descr'>70х100</span>
  //               </li>
  //             </ul>
  //             <ul>
  //               <li>
  //                 <span className='title'>Жанр</span>
  //                 {/* <span className='descr'>{genres[category as keyof typeof genres]}</span> */}
  //               </li>
  //               <li>
  //                 <span className='title'>Вес</span>
  //                 <span className='descr'>370г</span>
  //               </li>
  //               <li>
  //                 <span className='title'>ISBN</span>
  //                 <span className='descr'>978-5-4461-0923-4</span>
  //               </li>
  //               <li>
  //                 <span className='title'>Изготовитель</span>
  //                 <span className='descr'>
  //                   ООО «Питер Мейл». РФ, 198206, г.Санкт-Петербург, Петергофское ш, д.73, лит. А29
  //                 </span>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>

  //         <Reviews rating={rating} />
  //       </div>
  //     </section>
  //   );
};
