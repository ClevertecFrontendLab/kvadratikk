import { UseFormReturn } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { RegInputs } from '../../../interfaces/inputs';
import { emailErrors, telErrors } from '../data';
import { Email } from '../fields/email';
import { Tel } from '../fields/tel';

export const Step3 = ({
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
    setValue,
    formState: { errors },
  } = form;

  const telValidation = {
    ...register('phone', {
      required: true,
      validate: {
        checkMask: (value) => !/[x]/gi.test(value),
      },
      onChange: (e) => {
        setValue('phone', e.target.value);
      },
    }),
  };

  const showTelTooltip = () => {
    const error = telErrors[errors.phone?.type as keyof typeof telErrors];

    if (error) return error;

    return telErrors.tooltip;
  };

  const emailValidation = {
    ...register('email', {
      required: true,
      validate: {
        checkMask: (value) =>
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
            value
          ),
      },
    }),
  };

  const showEmailTooltip = () => {
    const error = emailErrors[errors.email?.type as keyof typeof emailErrors];

    if (error) return error;

    return emailErrors.tooltip;
  };

  return (
    <div className='auth__step' style={stepStyle}>
      <div className='auth__top'>
        <h4>Регистрация</h4>
        <span>3 шаг из 3</span>
      </div>
      <div className='auth__fields'>
        <Tel validation={telValidation} showTooltip={showTelTooltip} showBorder={!!errors.phone} />
        <Email validation={emailValidation} showTooltip={showEmailTooltip} showBorder={!!errors.email} />
      </div>
      <button type='submit' className='btn auth__submit' disabled={!!Object.keys(errors).length}>
        зарегистрироваться
      </button>
      <div className='auth__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/auth'>войти</NavLink>
      </div>
    </div>
  );
};
