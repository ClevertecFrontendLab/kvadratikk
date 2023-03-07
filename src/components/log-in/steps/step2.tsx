import React, { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { showBlurError } from '../../../helpers/show-blur-error';
import { showError } from '../../../helpers/show-error';
import { Inputs } from '../../../interfaces/inputs';
import { nameErrors, surnameErrors } from '../data';
import { Name } from '../fields/name';
import { Surname } from '../fields/surname';

export const Step2 = ({
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
  const [isNameBlurError, setIsNameBlurError] = useState(false);
  const [isSurnameBlurError, setIsSurnameBlurError] = useState(false);

  const isError = Object.keys(errors).length || !watch('name') || !watch('surname');
  const shouldDisabled = isNameBlurError || isSurnameBlurError;

  const showNameError = () => {
    return showError(errors, watch, 'name', nameErrors, isNameBlurError);
  };

  const showSurnameError = () => {
    return showError(errors, watch, 'surname', surnameErrors, isSurnameBlurError);
  };

  const showNameBlurError = () => {
    showBlurError('name', setIsNameBlurError, errors, watch);
  };

  const showSurnameBlurError = () => {
    showBlurError('surname', setIsSurnameBlurError, errors, watch);
  };

  const next = () => {
    showNameBlurError();
    showSurnameBlurError();

    if (isError) return;

    setStep(step + 1);
  };

  return (
    <div className='sign-in__step' style={stepStyle}>
      <div className='sign-in__top'>
        <h4>Регистрация</h4>
        <span>2 шаг из 3</span>
      </div>
      <div className='sign-in__fields'>
        <Name
          register={register}
          showError={showNameError}
          showBlurError={showNameBlurError}
          isBlurError={isNameBlurError}
          setIsBlurError={setIsNameBlurError}
        />
        <Surname
          register={register}
          showError={showSurnameError}
          showBlurError={showSurnameBlurError}
          isBlurError={isSurnameBlurError}
          setIsBlurError={setIsSurnameBlurError}
        />
      </div>
      <button type='button' disabled={shouldDisabled} className='btn sign-in__submit' onClick={next}>
        последний шаг
      </button>
      <div className='sign-in__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/authorization'>войти</NavLink>
      </div>
    </div>
  );
};
