import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RegInputs, Step1Inputs } from '../../../interfaces/inputs';
import { RootState } from '../../../store/store';
import { createLoginTooltip, createPasswordTooltip, loginErrors, passwordErrors } from '../data';
import { Login } from '../fields/login';
import { Password } from '../fields/password';

export const Step1 = ({
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

  const [isLoginBlur, setIsLoginBlur] = useState(false);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);

  const form = useForm<Step1Inputs>({
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (code === 400) reset();
  }, [code, reset]);

  const loginValidation = {
    ...register('login', {
      required: true,
      validate: {
        checkOnlyNumbers: (value) => !/^\d+$/gi.test(value),
        checkOnlyLetters: (value) => !/^[a-z]+$/gi.test(value),
        checkOther: (value) => /[\d]/gi.test(value) && /[a-z]/gi.test(value),
      },
      onChange: () => {
        setIsLoginBlur(false);
      },
      onBlur: () => {
        setIsLoginBlur(true);
      },
    }),
  };

  const isLoginBlurError = isLoginBlur && errors.login && errors.login?.type !== 'required';

  const showLoginTooltip = () => {
    const tooltip = 'Используйте для логина латинский алфавит и цифры';
    const error = loginErrors[errors.login?.type as keyof typeof loginErrors];

    if (isLoginBlurError) return createLoginTooltip(tooltip);
    if (error) return error;

    return tooltip;
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
    const tooltip = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
    const error = passwordErrors[errors.password?.type as keyof typeof passwordErrors];

    if (isPasswordBlurError) return createPasswordTooltip(tooltip);
    if (error) return error;

    return tooltip;
  };

  const onSubmit = (data: Step1Inputs) => {
    setFormValues({ ...formValues, ...data });
    setStep(step + 1);
  };

  return (
    <form className='sign-in__step' style={stepStyle} onSubmit={handleSubmit(onSubmit)}>
      <div className='sign-in__top'>
        <h4>Регистрация</h4>
        <span>1 шаг из 3</span>
      </div>
      <div className='sign-in__fields'>
        <Login
          validation={loginValidation}
          showTooltip={showLoginTooltip}
          showBorder={Boolean(isLoginBlurError || errors.login?.type === 'required')}
        />
        <Password
          validation={passwordValidation}
          showTooltip={showPasswordTooltip}
          showBorder={Boolean(isPasswordBlurError || errors.password?.type === 'required')}
          showCheck={Boolean(!errors.password && watch('password'))}
        />
      </div>
      <button type='submit' className='btn sign-in__submit'>
        следующий шаг
      </button>
      <div className='sign-in__transition'>
        <span>Есть учётная запись?</span>
        <NavLink to='/auth'>войти</NavLink>
      </div>
    </form>
  );
};
