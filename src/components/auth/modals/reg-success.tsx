import { NavLink } from 'react-router-dom';

export const RegSuccess = () => {
  return (
    <div className='auth__modal' data-test-id='status-block'>
      <div className='auth__top'>
        <h4>Регистрация успешна</h4>
      </div>

      <div className='auth__text'>
        Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
      </div>

      <NavLink to='/auth'>
        <button type='button' className='btn auth__submit'>
          Вход
        </button>
      </NavLink>
    </div>
  );
};
