export const ForgotSuccess = () => {
  return (
    <div className='auth__modal' data-test-id='status-block'>
      <div className='auth__top'>
        <h4>Письмо выслано</h4>
      </div>

      <div className='auth__text'>
        Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
      </div>
    </div>
  );
};
