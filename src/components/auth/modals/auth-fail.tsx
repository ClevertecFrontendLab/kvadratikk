export const AuthFail = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <div className='auth__modal' data-test-id='status-block'>
      <div className='auth__top'>
        <h4>Вход не выполнен</h4>
      </div>

      <div className='auth__text'>Что-то пошло не так. Попробуйте ещё раз</div>

      <button type='button' className='btn auth__submit' onClick={handleSubmit}>
        Повторить
      </button>
    </div>
  );
};
