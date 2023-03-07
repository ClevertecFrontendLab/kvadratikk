import { NavLink } from 'react-router-dom';

import './log-in.scss';

export const LogIn = () => {
  return (
    <form className='log-in__form'>
      <div className='log-in__step'>
        <div className='log-in__top'>
          <h4>Вход в личный кабинет</h4>
        </div>
        <div className='log-in__fields'>
          <input type='text' placeholder='Логин' />
          <input type='password' placeholder='Пароль' />
        </div>
        <NavLink to='/registration' className='log-in__forget'>
          <span>Забыли логин или пароль?</span>
        </NavLink>
        <button type='submit' className='btn log-in__submit'>
          вход
        </button>
        <div className='log-in__transition'>
          <span>Нет учётной записи?</span>
          <NavLink to='/registration'>Регистрация</NavLink>
        </div>
      </div>
    </form>
  );
};
