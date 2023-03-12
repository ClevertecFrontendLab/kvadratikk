import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowR } from '../../assets/icons/arrow-r.svg';
import { AuthInputs } from '../../interfaces/inputs';
import { setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';
import { createAuthUser } from '../../store/thunks';

import { Login } from './fields/login';
import { Password } from './fields/password';
import { AuthFail } from './modals/auth-fail';
import { requiredErrors } from './data';

import './auth.scss';

export const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, code } = useSelector((state: RootState) => state.authorization);

  const [, setIsLoginBlur] = useState(false);
  const otherCode = code && code !== 200 && code !== 400;

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>({
    mode: 'all',
  });

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));

    if (code === 200) navigate('/books/all');
  }, [code, dispatch, loading, navigate]);

  const loginValidation = {
    ...register('identifier', {
      required: true,
      onChange: () => {
        setIsLoginBlur(false);
      },
      onBlur: () => {
        setIsLoginBlur(true);
      },
    }),
  };

  const showLoginTooltip = () => {
    const error = requiredErrors[errors.identifier?.type as keyof typeof requiredErrors];

    if (error) return error;

    return requiredErrors.tooltip;
  };

  const passwordValidation = {
    ...register('password', {
      required: true,
    }),
  };

  const showPasswordTooltip = () => {
    const error = requiredErrors[errors.password?.type as keyof typeof requiredErrors];

    if (error) return error;

    return requiredErrors.tooltip;
  };

  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    dispatch(createAuthUser(data));
  };

  return (
    <Fragment>
      {otherCode && <AuthFail handleSubmit={() => onSubmit(getValues())} />}
      <form className='auth__form' data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='auth__step'>
          <div className='auth__top'>
            <h4>Вхoд в личный кабинет</h4>
          </div>
          <div className='auth__fields'>
            <Login
              placeholder='Логин'
              validation={loginValidation}
              showBorder={!!(errors.identifier || code === 400)}
              showTooltip={showLoginTooltip}
            />
            <Password
              validation={passwordValidation}
              showBorder={!!(errors.password || code === 400)}
              showTooltip={showPasswordTooltip}
              showCheck={false}
              isEmpty={!watch('password')}
            />
          </div>

          {code === 400 && (
            <div className='auth__wrong' data-test-id='hint'>
              Неверный логин или пароль!
            </div>
          )}
          <NavLink to='/forgot-pass' className='auth__forget'>
            {code === 400 ? (
              <span className='auth__question'>Восстановить?</span>
            ) : (
              <span>Забыли логин или пароль?</span>
            )}
          </NavLink>

          <button type='submit' className='btn auth__submit'>
            вход
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
