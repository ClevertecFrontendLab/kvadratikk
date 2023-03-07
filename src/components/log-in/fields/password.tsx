import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ReactComponent as Check } from '../../../assets/icons/check.svg';
import { ReactComponent as Eye } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeClosed } from '../../../assets/icons/eye-closed.svg';
import { Inputs } from '../../../interfaces/inputs';

export const Password = ({
  register,
  showError,
  showCheck,
  showBlurError,
  isBlurError,
  setIsBlurError,
}: {
  register: UseFormRegister<Inputs>;
  showError: () => string;
  showCheck: boolean;
  isBlurError: boolean;
  setIsBlurError: React.Dispatch<React.SetStateAction<boolean>>;
  showBlurError: () => void;
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <label className='sign-in__label'>
      <input
        className={isBlurError ? 'border-error' : ''}
        type={isPasswordHidden ? 'password' : 'text'}
        placeholder='Пароль'
        {...register('password', {
          required: true,
          validate: {
            checkAll: (value) => !(value.length < 8 && !/[\d]/g.test(value) && !/[A-Z]/g.test(value)),
            checkLengthWithNumber: (value) => !(value.length < 8 && !/[\d]/g.test(value) && /[A-Z]/g.test(value)),
            checkLength: (value) => !(value.length < 8 && /[\d]/g.test(value) && /[A-Z]/g.test(value)),
            checkLetterAndNumber: (value) => !(!/[\d]/g.test(value) || !/[A-Z]/g.test(value)),
          },
          onBlur: () => {
            showBlurError();
          },
          onChange: () => {
            setIsBlurError(false);
          },
        })}
      />
      {showCheck && <Check />}
      <button
        type='button'
        onClick={() => {
          setIsPasswordHidden(!isPasswordHidden);
        }}
      >
        {isPasswordHidden ? <EyeClosed /> : <Eye />}
      </button>
      <div className='sign-in__tooltip'>{showError()}</div>
    </label>
  );
};
