import { NavLink } from 'react-router-dom';

export const RegExist = ({ setState }: { setState: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const handleClick = () => {
    setState(false);
  };

  return (
    <div className='log-in__modal'>
      <div className='log-in__top'>
        <h4>Данные не сохранились</h4>
      </div>

      <div className='log-in__text'>
        Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail
      </div>

      <NavLink to='/registration' onClick={handleClick}>
        <button type='button' className='btn log-in__submit'>
          Назад к регистрации
        </button>
      </NavLink>
    </div>
  );
};
