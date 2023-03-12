import { UseFormReturn } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { RegInputs } from '../../../interfaces/inputs';
import { requiredErrors } from '../data';
import { Name } from '../fields/name';
import { Surname } from '../fields/surname';

export const Step2 = ({
  stepStyle,
  form,
}: {
  stepStyle: {
    minWidth: number;
    marginRight: number;
  };
  form: UseFormReturn<RegInputs>;
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  const nameValidation = {
    ...register('firstName', {
      required: true,
    }),
  };

  const showNameTooltip = () => {
    const error = requiredErrors[errors.firstName?.type as keyof typeof requiredErrors];

    if (error) return error;

    return requiredErrors.tooltip;
  };

  const surnameValidation = {
    ...register('lastName', {
      required: true,
    }),
  };

  const showSurnameTooltip = () => {
    const error = requiredErrors[errors.lastName?.type as keyof typeof requiredErrors];

    if (error) return error;

    return requiredErrors.tooltip;
  };

  return (
    <div className='auth__step' style={stepStyle}>
      <div className='auth__top'>
        <h4>Регистрация</h4>
        <span>2 шаг из 3</span>
      </div>
      <div className='auth__fields'>
        <Name validation={nameValidation} showTooltip={showNameTooltip} showBorder={!!errors.firstName} />
        <Surname validation={surnameValidation} showTooltip={showSurnameTooltip} showBorder={!!errors.lastName} />
      </div>
      <button type='submit' className='btn auth__submit' disabled={!!Object.keys(errors).length}>
        последний шаг
      </button>
      <div className='auth__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/auth'>войти</NavLink>
      </div>
    </div>
  );
};
