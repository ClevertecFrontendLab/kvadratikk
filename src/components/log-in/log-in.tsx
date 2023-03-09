import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeClosed } from '../../assets/icons/eye-closed.svg';
import { showAuthError } from '../../helpers/show-error';
import { AuthInputs } from '../../interfaces/inputs';
import { setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';
import { createAuthUser } from '../../store/thunks';

import { AuthFail } from './modals/auth-fail';
import { requiredErrors } from './data';

import './log-in.scss';

export const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, code } = useSelector((state: RootState) => state.authorization);

  const [isWrong, setIsWrong] = useState(code === 400);
  const [isFail, setIsFail] = useState(Boolean(code && code !== 200 && code !== 400));

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));

    if (code) {
      if (code === 200) {
        navigate('/books/all');
      } else if (code === 400) {
        setIsWrong(true);
      } else {
        setIsFail(true);
      }
    }
  }, [code, dispatch, loading, navigate]);

  const showLoginError = () => {
    return showAuthError(errors, watch, 'login', requiredErrors, false);
  };

  const showPasswordError = () => {
    return showAuthError(errors, watch, 'password', requiredErrors, false);
  };

  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    dispatch(createAuthUser(data));
  };

  return (
    <Fragment>
      {isFail && <AuthFail setState={setIsFail} handleSubmit={() => onSubmit(getValues())} />}
      <form className='log-in__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='log-in__step'>
          <div className='log-in__top'>
            <h4>Вход в личный кабинет</h4>
          </div>
          <div className='log-in__fields'>
            <label className='sign-in__label'>
              <input
                className={errors.login || isWrong ? 'border-error' : ''}
                type='text'
                autoComplete='username'
                placeholder='Логин'
                {...register('login', {
                  required: true,
                })}
              />
              <div className='sign-in__tooltip'>{showLoginError()}</div>
            </label>
            <label className='sign-in__label'>
              <input
                className={errors.password || isWrong ? 'border-error' : ''}
                autoComplete='current-password'
                placeholder='Пароль'
                type={isPasswordHidden ? 'password' : 'text'}
                {...register('password', {
                  required: true,
                })}
              />
              <button
                type='button'
                onClick={() => {
                  setIsPasswordHidden(!isPasswordHidden);
                }}
              >
                {isPasswordHidden ? <EyeClosed /> : <Eye />}
              </button>
              <div className='sign-in__tooltip'>{showPasswordError()}</div>
            </label>
          </div>

          {isWrong && <div className='log-in__wrong'>Неверный логин или пароль!</div>}
          <NavLink to='/forgot-pass' className='log-in__forget'>
            {isWrong ? <span className='log-in__question'>Восстановить?</span> : <span>Забыли логин или пароль?</span>}
          </NavLink>

          <button type='submit' className='btn log-in__submit'>
            вход
          </button>
          <div className='log-in__transition'>
            <span>Нет учётной записи?</span>
            <NavLink to='/registration'>Регистрация</NavLink>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
