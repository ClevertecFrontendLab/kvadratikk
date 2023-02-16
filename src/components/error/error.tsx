import caution from '../../assets/icons/caution.svg';
import { Close } from '../icons/close';

import './error.scss';

export const Error = () => {
  return (
    <div className='error'>
      <img src={caution} alt='caution' />
      <span>Что-то пошло не так. Обновите страницу через некоторое время.</span>
      <button type='button'>
        <Close />
      </button>
    </div>
  );
};
