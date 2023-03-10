import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RegInputs, Step3Inputs } from '../../../interfaces/inputs';
import { AppDispatch, RootState } from '../../../store/store';
import { createUser } from '../../../store/thunks';
import { emailErrors, telErrors } from '../data';
import { Email } from '../fields/email';
import { Tel } from '../fields/tel';

export const Step3 = ({
  stepStyle,
  formValues,
  setFormValues,
}: {
  stepStyle: {
    minWidth: number;
    marginRight: number;
  };
  formValues: RegInputs;
  setFormValues: React.Dispatch<React.SetStateAction<RegInputs>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { code } = useSelector((state: RootState) => state.registration);

  const form = useForm<Step3Inputs>({
    mode: 'onBlur',
  });

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (code === 400) reset();
  }, [code, reset]);

  const telValidation = {
    ...register('tel', {
      required: true,
      validate: {
        checkMask: (value) => !/[x]/gi.test(value),
      },
      onChange: (e) => {
        setValue('tel', e.target.value);
      },
    }),
  };

  const showTelTooltip = () => {
    const tooltip = 'В формате +375 (xx) xxx-xx-xx';
    const error = telErrors[errors.tel?.type as keyof typeof telErrors];

    if (error) return error;

    return tooltip;
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
    const tooltip = '';
    const error = emailErrors[errors.email?.type as keyof typeof emailErrors];

    if (error) return error;

    return tooltip;
  };

  const onSubmit = (data: Step3Inputs) => {
    setFormValues({ ...formValues, ...data });
    dispatch(createUser({ ...formValues, ...data }));
  };

  return (
    <form className='sign-in__step' style={stepStyle} onSubmit={handleSubmit(onSubmit)}>
      <div className='sign-in__top'>
        <h4>Регистрация</h4>
        <span>3 шаг из 3</span>
      </div>
      <div className='sign-in__fields'>
        <Tel validation={telValidation} showTooltip={showTelTooltip} showBorder={Boolean(errors.tel)} />
        <Email validation={emailValidation} showTooltip={showEmailTooltip} showBorder={Boolean(errors.email)} />
      </div>
      <button type='submit' className='btn sign-in__submit'>
        зарегистрироваться
      </button>
      <div className='sign-in__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/auth'>войти</NavLink>
      </div>
    </form>
  );
};
