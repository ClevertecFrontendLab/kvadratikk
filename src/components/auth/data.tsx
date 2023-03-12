import { Fragment } from 'react';

const wrapper = (element: JSX.Element | string) => {
  return (
    <div className='auth__tooltip' data-test-id='hint'>
      {element}
    </div>
  );
};

const errorWrapper = (element: JSX.Element | string) => {
  return (
    <div className='auth__tooltip red' data-test-id='hint'>
      {element}
    </div>
  );
};

const requiredTooltip = errorWrapper('Поле не может быть пустым');

export const requiredErrors = {
  required: requiredTooltip,
  tooltip: wrapper(''),
};

export const loginErrors = {
  checkOnlyNumbers: wrapper(
    <Fragment>
      Используйте для логина <span style={{ color: '#f42c4f' }}>латинский алфавит</span> и <span>цифры</span>
    </Fragment>
  ),
  checkOnlyLetters: wrapper(
    <Fragment>
      Используйте для логина <span>латинский алфавит</span> и <span style={{ color: '#f42c4f' }}>цифры</span>
    </Fragment>
  ),
  checkOther: wrapper(
    <Fragment>
      Используйте для логина <span style={{ color: '#f42c4f' }}>латинский алфавит</span> и{' '}
      <span style={{ color: '#f42c4f' }}>цифры</span>
    </Fragment>
  ),
  required: requiredTooltip,
  tooltip: wrapper('Используйте для логина латинский алфавит и цифры'),
  blur: errorWrapper('Используйте для логина латинский алфавит и цифры'),
};

export const passwordErrors = {
  checkAll: wrapper(
    <Fragment>
      Пароль <span style={{ color: '#f42c4f' }}>не менее 8 символов</span>, с{' '}
      <span style={{ color: '#f42c4f' }}>заглавной буквой</span> и <span style={{ color: '#f42c4f' }}>цифрой</span>
    </Fragment>
  ),
  checkLength: wrapper(
    <Fragment>
      Пароль <span style={{ color: '#f42c4f' }}>не менее 8 символов</span>, с <span>заглавной буквой</span> и{' '}
      <span>цифрой</span>
    </Fragment>
  ),
  checkLengthWithNumber: wrapper(
    <Fragment>
      Пароль <span style={{ color: '#f42c4f' }}>не менее 8 символов</span>, с <span>заглавной буквой</span> и{' '}
      <span style={{ color: '#f42c4f' }}>цифрой</span>
    </Fragment>
  ),
  checkLetterAndNumber: wrapper(
    <Fragment>
      Пароль <span>не менее 8 символов</span>, с <span style={{ color: '#f42c4f' }}>заглавной буквой</span> и{' '}
      <span style={{ color: '#f42c4f' }}>цифрой</span>
    </Fragment>
  ),
  required: requiredTooltip,
  tooltip: wrapper('Пароль не менее 8 символов, с заглавной буквой и цифрой'),
  blur: errorWrapper('Пароль не менее 8 символов, с заглавной буквой и цифрой'),
  resetToltip: wrapper(''),
  match: errorWrapper('Пароли не совпадают'),
};

export const telErrors = {
  checkMask: errorWrapper('В формате +375 (xx) xxx-xx-xx'),
  required: requiredTooltip,
  tooltip: wrapper('В формате +375 (xx) xxx-xx-xx'),
};

export const emailErrors = {
  checkMask: errorWrapper('Введите корректный e-mail'),
  required: requiredTooltip,
  tooltip: wrapper(''),
  forgotTooltip: wrapper('На этот email будет отправлено письмо с инструкциями по восстановлению пароля'),
  errorMessage: errorWrapper('error'),
};
