import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { resetRegistration } from '../../../store/slices/registration-slice';
import { AppDispatch } from '../../../store/store';

export const RegExist = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(resetRegistration());
  };

  return (
    <div className='auth__modal' data-test-id='status-block'>
      <div className='auth__top'>
        <h4>Данные не сохранились</h4>
      </div>

      <div className='auth__text'>
        Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail
      </div>

      <NavLink to='/registration' onClick={handleClick}>
        <button type='button' className='btn auth__submit'>
          Назад к регистрации
        </button>
      </NavLink>
    </div>
  );
};
