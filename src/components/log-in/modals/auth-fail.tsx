export const AuthFail = ({
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
        <h4>Вход не выполнен</h4>
      </div>

      <div className='log-in__text'>Что-то пошло не так. Попробуйте ещё раз</div>

      <button type='button' className='btn log-in__submit' onClick={handleClick}>
        Повторить
      </button>
    </div>
  );
};
