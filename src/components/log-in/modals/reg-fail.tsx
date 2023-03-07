import { NavLink } from 'react-router-dom';

export const RegFail = ({
  setState,
  handleSubmit,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}) => {
  const handleClick = () => {
    setState(false);
    handleSubmit();
  };

  return (
    <div className='log-in__modal'>
      <div className='log-in__top'>
        <h4>Данные не сохранились</h4>
      </div>

      <div className='log-in__text'>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</div>

      <NavLink to='/registration' onClick={handleClick}>
        <button type='button' className='btn log-in__submit'>
          Повторить
        </button>
      </NavLink>
    </div>
  );
};
