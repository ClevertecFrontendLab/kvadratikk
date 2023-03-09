import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { showBlurError } from '../../../helpers/show-blur-error';
import { showError } from '../../../helpers/show-error';
import { Inputs } from '../../../interfaces/inputs';
import { emailErrors, telErrors } from '../data';
import { Email } from '../fields/email';
import { Tel } from '../fields/tel';

export const Step3 = ({
  stepStyle,
  register,
  errors,
  watch,
  setValue,
}: {
  stepStyle: {
    minWidth: number;
    marginRight: number;
  };
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  watch: UseFormWatch<Inputs>;
  setValue: UseFormSetValue<Inputs>;
}) => {
  const [isTelBlurError, setIsTelBlurError] = useState(false);
  const [isEmailBlurError, setIsEmailBlurError] = useState(false);

  const shouldDisabled = isTelBlurError || isEmailBlurError;

  const showTelError = () => {
    return showError(errors, watch, 'tel', telErrors, isTelBlurError);
  };

  const showEmailError = () => {
    return showError(errors, watch, 'email', emailErrors, isEmailBlurError);
  };

  const showTelBlurError = () => {
    showBlurError('tel', setIsTelBlurError, errors, watch);
  };

  const showEmailBlurError = () => {
    showBlurError('email', setIsEmailBlurError, errors, watch);
  };

  const submit = () => {
    showTelBlurError();
    showEmailBlurError();
  };

  return (
    <div className='sign-in__step' style={stepStyle}>
      <div className='sign-in__top'>
        <h4>Регистрация</h4>
        <span>3 шаг из 3</span>
      </div>
      <div className='sign-in__fields'>
        <Tel
          register={register}
          showError={showTelError}
          showBlurError={showTelBlurError}
          isBlurError={isTelBlurError}
          setIsBlurError={setIsTelBlurError}
          setValue={setValue}
        />
        <Email
          register={register}
          showError={showEmailError}
          showBlurError={showEmailBlurError}
          isBlurError={isEmailBlurError}
          setIsBlurError={setIsEmailBlurError}
        />
      </div>
      <button type='submit' disabled={shouldDisabled} className='btn sign-in__submit' onClick={submit}>
        зарегистрироваться
      </button>
      <div className='sign-in__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/auth'>войти</NavLink>
      </div>
    </div>
  );
};
