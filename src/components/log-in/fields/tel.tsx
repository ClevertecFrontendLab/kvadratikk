import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { Inputs } from '../../../interfaces/inputs';
import { telErrors } from '../data';

export const Tel = ({
  register,
  showError,
  showBlurError,
  isBlurError,
  setIsBlurError,
  setValue,
}: {
  register: UseFormRegister<Inputs>;
  showError: () => string;
  isBlurError: boolean;
  setIsBlurError: React.Dispatch<React.SetStateAction<boolean>>;
  showBlurError: () => void;
  setValue: UseFormSetValue<Inputs>;
}) => {
  return (
    <label className='sign-in__label'>
      <MaskedInput
        mask={['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        className={isBlurError ? 'border-error' : ''}
        type='tel'
        placeholder='Номер телефона'
        placeholderChar='x'
        {...register('tel', {
          validate: {
            checkMask: (value) => !/[x]/gi.test(value),
          },
          onBlur: () => {
            showBlurError();
          },
          onChange: (e) => {
            setValue('tel', e.target.value);
            setIsBlurError(false);
          },
        })}
      />
      <div className='sign-in__tooltip'>{isBlurError ? showError() : telErrors.default}</div>
    </label>
  );
};
