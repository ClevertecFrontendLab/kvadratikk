import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { createTooltip } from '../../helpers/create-tooltip';
import { PasswordsInputs } from '../../interfaces/inputs';
import { setIsLoading } from '../../store/slices/loading-slice';
import { setRecoveryLoading } from '../../store/slices/recovery-slice';
import { AppDispatch, RootState } from '../../store/store';
import { resetPassword } from '../../store/thunks';

import { Password } from './fields/password';
import { ResetFail } from './modals/reset-fail';
import { ResetSuccess } from './modals/reset-success';
import { createPasswordTooltip, passwordErrors } from './data';

import './auth.scss';

export const ResetPassword = () => {
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.recovery);

  const [isPasswordBlur, setIsPasswordBlur] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));
  }, [dispatch, loading]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordsInputs>({
    mode: 'all',
  });

  const passwordsMatch = () => watch('password') === watch('repeat');

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

  const repeatValidation = {
    ...register('repeat', {
      required: true,
      onChange: () => {
        setIsNotMatch(false);
      },
      onBlur: () => {
        if (!passwordsMatch()) setIsNotMatch(true);
      },
    }),
  };

  const showRepeatTooltip = () => {
    const tooltip = '';
    const error = passwordErrors[errors.repeat?.type as keyof typeof passwordErrors];

    if (isNotMatch) return createTooltip('Пароли не совпадают', ['Пароли не совпадают']);
    if (error) return error;

    return tooltip;
  };

  const onSubmit: SubmitHandler<PasswordsInputs> = (data) => {
    if (!passwordsMatch()) setIsNotMatch(true);

    const code = search.split('?code=')[1];

    dispatch(resetPassword({ ...data, code }));
  };

  return (
    <Fragment>
      {loading === 'succeeded' && <ResetSuccess />}
      {loading === 'failed' && (
        <ResetFail
          handleSubmit={() => {
            dispatch(setRecoveryLoading('idle'));
          }}
        />
      )}

      <form className='auth__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='auth__step'>
          <div className='auth__top'>
            <h4>Восстановление пароля</h4>
          </div>
          <div className='auth__fields'>
            <Password
              placeholder='Новый пароль'
              validation={passwordValidation}
              showTooltip={showPasswordTooltip}
              showBorder={Boolean(isPasswordBlurError || errors.password?.type === 'required')}
              showCheck={Boolean(!errors.password && watch('password'))}
            />
            <Password
              placeholder='Повторите пароль'
              validation={repeatValidation}
              showTooltip={showRepeatTooltip}
              showBorder={Boolean(isNotMatch || errors.repeat)}
              showCheck={false}
            />
          </div>

          <button type='submit' disabled={isNotMatch} className='btn auth__submit'>
            сохранить изменения
          </button>

          <span className='auth__transition'>После сохранения войдите в библиотеку, используя новый пароль</span>
        </div>
      </form>
    </Fragment>
  );
};
