import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { showBlurError } from '../../../helpers/show-blur-error';
import { showError } from '../../../helpers/show-error';
import { Inputs } from '../../../interfaces/inputs';
import { loginErrors, passwordErrors } from '../data';
import { Login } from '../fields/login';
import { Password } from '../fields/password';

export const Step1 = ({
  stepStyle,
  register,
  errors,
  step,
  setStep,
  watch,
}: {
  stepStyle: {
    minWidth: number;
    marginRight: number;
  };
  step: number;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  watch: UseFormWatch<Inputs>;
}) => {
  const [isLoginBlurError, setIsLoginBlurError] = useState(false);
  const [isPasswordBlurError, setIsPasswordBlurError] = useState(false);

  const isError = Object.keys(errors).length || !watch('password') || !watch('login');
  const shouldDisabled = isLoginBlurError || isPasswordBlurError;

  const showLoginError = () => {
    return showError(errors, watch, 'login', loginErrors, isLoginBlurError);
  };

  const showPasswordError = () => {
    return showError(errors, watch, 'password', passwordErrors, isPasswordBlurError);
  };

  const showLoginBlurError = () => {
    showBlurError('login', setIsLoginBlurError, errors, watch);
  };

  const showPasswordBlurError = () => {
    showBlurError('password', setIsPasswordBlurError, errors, watch);
  };

  const next = () => {
    showLoginBlurError();
    showPasswordBlurError();

    if (isError) return;

    setStep(step + 1);
  };

  return (
    <div className='sign-in__step' style={stepStyle}>
      <div className='sign-in__top'>
        <h4>Регистрация</h4>
        <span>1 шаг из 3</span>
      </div>
      <div className='sign-in__fields'>
        <Login
          register={register}
          showError={showLoginError}
          showBlurError={showLoginBlurError}
          isBlurError={isLoginBlurError}
          setIsBlurError={setIsLoginBlurError}
        />
        <Password
          register={register}
          showError={showPasswordError}
          showBlurError={showPasswordBlurError}
          isBlurError={isPasswordBlurError}
          setIsBlurError={setIsPasswordBlurError}
          showCheck={Boolean(watch('password') && !errors.password)}
        />
      </div>
      <button type='button' className='btn sign-in__submit' disabled={shouldDisabled} onClick={next}>
        следующий шаг
      </button>
      <div className='sign-in__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/authorization'>войти</NavLink>
      </div>
    </div>
  );
};
