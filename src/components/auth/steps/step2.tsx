import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RegInputs, Step2Inputs } from '../../../interfaces/inputs';
import { RootState } from '../../../store/store';
import { requiredErrors } from '../data';
import { Name } from '../fields/name';
import { Surname } from '../fields/surname';

export const Step2 = ({
  stepStyle,
  step,
  setStep,
  formValues,
  setFormValues,
}: {
  stepStyle: {
    minWidth: number;
    marginRight: number;
  };
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formValues: RegInputs;
  setFormValues: React.Dispatch<React.SetStateAction<RegInputs>>;
}) => {
  const { code } = useSelector((state: RootState) => state.registration);

  const form = useForm<Step2Inputs>({
    mode: 'onBlur',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (code === 400) reset();
  }, [code, reset]);

  const nameValidation = {
    ...register('name', {
      required: true,
    }),
  };

  const showNameTooltip = () => {
    const tooltip = '';
    const error = requiredErrors[errors.name?.type as keyof typeof requiredErrors];

    if (error) return error;

    return tooltip;
  };

  const surnameValidation = {
    ...register('surname', {
      required: true,
    }),
  };

  const showSurnameTooltip = () => {
    const tooltip = '';
    const error = requiredErrors[errors.surname?.type as keyof typeof requiredErrors];

    if (error) return error;

    return tooltip;
  };

  const onSubmit = (data: Step2Inputs) => {
    setFormValues({ ...formValues, ...data });
    setStep(step + 1);
  };

  return (
    <form className='sign-in__step' style={stepStyle} onSubmit={handleSubmit(onSubmit)}>
      <div className='sign-in__top'>
        <h4>Регистрация</h4>
        <span>2 шаг из 3</span>
      </div>
      <div className='sign-in__fields'>
        <Name validation={nameValidation} showTooltip={showNameTooltip} showBorder={Boolean(errors.name)} />
        <Surname validation={surnameValidation} showTooltip={showSurnameTooltip} showBorder={Boolean(errors.surname)} />
      </div>
      <button type='submit' className='btn sign-in__submit'>
        последний шаг
      </button>
      <div className='sign-in__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/auth'>войти</NavLink>
      </div>
    </form>
  );
};
