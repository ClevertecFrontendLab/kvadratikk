export const RegFail = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <div className='auth__modal' data-test-id='status-block'>
      <div className='auth__top'>
        <h4>Данные не сохранились</h4>
      </div>

      <div className='auth__text'>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</div>

      <button type='button' className='btn auth__submit' onClick={handleSubmit}>
        Повторить
      </button>
    </div>
  );
};
