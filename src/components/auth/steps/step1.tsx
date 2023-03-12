import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { RegInputs } from '../../../interfaces/inputs';
import { loginErrors, passwordErrors } from '../data';
import { Login } from '../fields/login';
import { Password } from '../fields/password';

export const Step1 = ({
  stepStyle,
  form,
}: {
  stepStyle: {
    minWidth: number;
    marginRight: number;
  };
  form: UseFormReturn<RegInputs>;
}) => {
  const [isLoginBlur, setIsLoginBlur] = useState(false);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const loginValidation = {
    ...register('username', {
      required: true,
      validate: {
        checkOnlyNumbers: (value) => {
          if (/^\d+$/gi.test(value)) return false;
          if (/[а-я]/gi.test(value) && /\d/gi.test(value)) return false;

          return true;
        },
        checkOnlyLetters: (value) => !/^[a-z]+$/gi.test(value),
        checkOther: (value) => {
          if (/[а-я]/gi.test(value) && !/\d/gi.test(value)) return false;

          return true;
        },
      },
      onChange: () => {
        setIsLoginBlur(false);
      },
      onBlur: () => {
        setIsLoginBlur(true);
      },
    }),
  };

  const isLoginBlurError = isLoginBlur && errors.username && errors.username?.type !== 'required';

  const showLoginTooltip = () => {
    const error = loginErrors[errors.username?.type as keyof typeof loginErrors];

    if (isLoginBlurError) return loginErrors.blur;
    if (errors.username?.type === 'required' && !isLoginBlur) return loginErrors.tooltip;
    if (error) return error;

    return loginErrors.tooltip;
  };

  const passwordValidation = {
    ...register('password', {
      required: true,
      validate: {
        checkAll: (value) => !(value.length < 8 && !/[\d]/g.test(value) && !/[A-Z]/g.test(value)),
        checkLengthWithNumber: (value) => !(value.length < 8 && !/[\d]/g.test(value) && /[A-Z]/g.test(value)),
        checkLength: (value) => !(value.length < 8 && /[\d]/g.test(value) && /[A-Z]/g.test(value)),
        checkLetterAndNumber: (value) => !(!/[\d]/g.test(value) || !/[A-Z]/g.test(value)),
      },
      onChange: () => {
        setIsPasswordBlur(false);
      },
      onBlur: () => {
        setIsPasswordBlur(true);
      },
    }),
  };

  const isPasswordBlurError = isPasswordBlur && errors.password && errors.password?.type !== 'required';

  const showPasswordTooltip = () => {
    const error = passwordErrors[errors.password?.type as keyof typeof passwordErrors];

    if (isPasswordBlurError) return passwordErrors.blur;
    if (errors.password?.type === 'required' && !isPasswordBlur) return passwordErrors.tooltip;
    if (error) return error;

    return passwordErrors.tooltip;
  };

  return (
    <div className='auth__step' style={stepStyle}>
      <div className='auth__top'>
        <h4>Регистрация</h4>
        <span>1 шаг из 3</span>
      </div>
      <div className='auth__fields'>
        <Login
          validation={loginValidation}
          showTooltip={showLoginTooltip}
          showBorder={!!(isLoginBlurError || (errors.username?.type === 'required' && isLoginBlur))}
        />
        <Password
          validation={passwordValidation}
          showTooltip={showPasswordTooltip}
          showBorder={!!(isPasswordBlurError || (errors.password?.type === 'required' && isPasswordBlur))}
          showCheck={!!(!errors.password && watch('password'))}
          isEmpty={!watch('password')}
        />
      </div>
      <button
        type='submit'
        className='btn auth__submit'
        disabled={!!(isLoginBlurError || isPasswordBlurError || Object.keys(errors).length)}
      >
        следующий шаг
      </button>
      <div className='auth__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/auth'>войти</NavLink>
      </div>
    </div>
  );
};
