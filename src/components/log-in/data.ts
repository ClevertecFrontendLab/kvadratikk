import { createTooltip } from '../../helpers/create-tooltip';

const requiredTooltip = 'Поле не может быть пустым';
const loginTooltip = 'Используйте для логина латинский алфавит и цифры';
const passwordTooltip = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
const telTooltip = 'В формате +375 (xx) xxx-xx-xx';
const emailTooltip = 'Введите корректный e-mail';

const createLoginTooltip = (splitWord: string | string[]) =>
  createTooltip(loginTooltip, Array.isArray(splitWord) ? splitWord : [splitWord]);
const createPasswordTooltip = (splitWord: string | string[]) =>
  createTooltip(passwordTooltip, Array.isArray(splitWord) ? splitWord : [splitWord]);

export const loginErrors = {
  checkOnlyNumbers: createLoginTooltip('латинский алфавит'),
  checkOnlyLetters: createLoginTooltip('цифры'),
  checkOther: createLoginTooltip(['латинский алфавит', 'цифры']),
  required: createTooltip(requiredTooltip, [requiredTooltip]),
  blur: createLoginTooltip(loginTooltip),
  default: loginTooltip,
};

export const passwordErrors = {
  checkAll: createPasswordTooltip(['не менее 8 символов', 'заглавной буквой', 'цифрой']),
  checkLength: createPasswordTooltip('не менее 8 символов'),
  checkLengthWithNumber: createPasswordTooltip(['не менее 8 символов', 'цифрой']),
  checkLetterAndNumber: createPasswordTooltip(['заглавной буквой', 'цифрой']),
  required: createTooltip(requiredTooltip, [requiredTooltip]),
  blur: createPasswordTooltip(passwordTooltip),
  default: passwordTooltip,
};

export const nameErrors = {
  required: createTooltip(requiredTooltip, [requiredTooltip]),
};

export const surnameErrors = {
  required: createTooltip(requiredTooltip, [requiredTooltip]),
};

export const telErrors = {
  checkMask: createTooltip(telTooltip, [telTooltip]),
  required: createTooltip(requiredTooltip, [requiredTooltip]),
  default: telTooltip,
  blur: createTooltip(telTooltip, [telTooltip]),
};

export const emailErrors = {
  checkMask: createTooltip(emailTooltip, [emailTooltip]),
  required: createTooltip(requiredTooltip, [requiredTooltip]),
  blur: createTooltip(emailTooltip, [emailTooltip]),
};
