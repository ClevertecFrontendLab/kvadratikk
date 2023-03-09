import { NavLink } from 'react-router-dom';

export const RegSuccess = ({ setState }: { setState: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const handleClick = () => {
    setState(false);
  };

  return (
    <div className='log-in__modal'>
      <div className='log-in__top'>
        <h4>Регистрация успешна</h4>
      </div>

      <div className='log-in__text'>
        Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
      </div>

      <NavLink onClick={handleClick} to='/auth'>
        <button type='button' className='btn log-in__submit'>
          Вход
        </button>
      </NavLink>
    </div>
  );
};
