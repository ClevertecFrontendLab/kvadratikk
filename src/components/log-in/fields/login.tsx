import { UseFormRegister } from 'react-hook-form';

import { Inputs } from '../../../interfaces/inputs';

export const Login = ({
  register,
  showError,
  showBlurError,
  isBlurError,
  setIsBlurError,
}: {
  register: UseFormRegister<Inputs>;
  showError: () => string;
  isBlurError: boolean;
  setIsBlurError: React.Dispatch<React.SetStateAction<boolean>>;
  showBlurError: () => void;
}) => {
  return (
    <label className='sign-in__label'>
      <input
        className={isBlurError ? 'border-error' : ''}
        type='text'
        placeholder='Придумайте логин для входа'
        {...register('login', {
          required: true,
          validate: {
            checkOnlyNumbers: (value) => !/^\d+$/gi.test(value),
            checkOnlyLetters: (value) => !/^[a-z]+$/gi.test(value),
            checkOther: (value) => /[\d]/gi.test(value) && /[a-z]/gi.test(value),
          },
          onBlur: () => {
            showBlurError();
          },
          onChange: () => {
            setIsBlurError(false);
          },
        })}
      />
      <div className='sign-in__tooltip'>{showError()}</div>
    </label>
  );
};
