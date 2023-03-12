import { NavLink } from 'react-router-dom';

export const ResetSuccess = () => {
  return (
    <div className='auth__modal' data-test-id='status-block'>
      <div className='auth__top'>
        <h4>Новые данные сохранены</h4>
      </div>

      <div className='auth__text'>Зайдите в личный кабинет, используя логин и новый пароль</div>

      <NavLink to='/auth'>
        <button type='button' className='btn auth__submit'>
          Вход
        </button>
      </NavLink>
    </div>
  );
};
