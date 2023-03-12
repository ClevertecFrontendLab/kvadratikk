import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ReactComponent as ArrowL } from '../../assets/icons/arrow-l.svg';
import { ReactComponent as ArrowR } from '../../assets/icons/arrow-r.svg';
import { EmailInputs } from '../../interfaces/inputs';
import { setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';
import { forgotPassword } from '../../store/thunks';

import { Email } from './fields/email';
import { ForgotSuccess } from './modals/forgot-success';
import { emailErrors } from './data';

import './auth.scss';

export const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, errorMessage } = useSelector((state: RootState) => state.recovery);

  const [, setIsEmailBlur] = useState(false);

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));
  }, [dispatch, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInputs>({
    mode: 'onBlur',
  });

  const emailValidation = {
    ...register('email', {
      required: true,
      validate: {
        checkMask: (value) =>
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
            value
          ),
      },
      onChange: () => {
        setIsEmailBlur(false);
      },
      onBlur: () => {
        setIsEmailBlur(true);
      },
    }),
  };

  const showEmailTooltip = () => {
    const error = emailErrors[errors.email?.type as keyof typeof emailErrors];

    if (errorMessage) return emailErrors.errorMessage;
    if (error) return error;

    return emailErrors.forgotTooltip;
  };

  const onSubmit: SubmitHandler<EmailInputs> = (data) => {
    dispatch(forgotPassword(data));
  };

  return (
    <Fragment>
      {loading === 'succeeded' && <ForgotSuccess />}
      <form className='auth__form' data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
        <NavLink to='/auth' className='auth__header'>
          <ArrowL />
          <span>вход в личный кабинет</span>
        </NavLink>
        <div className='auth__step'>
          <div className='auth__top recovery'>
            <h4>Восстановление пароля</h4>
          </div>
          <div className='auth__fields'>
            <Email
              validation={emailValidation}
              showTooltip={showEmailTooltip}
              showBorder={!!(errors.email || errorMessage)}
            />
          </div>

          <button type='submit' className='btn auth__submit'>
            восстановить
          </button>
          <div className='auth__transition'>
            <span>Нет учётной записи?</span>
            <NavLink to='/registration'>
              Регистрация <ArrowR />
            </NavLink>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
