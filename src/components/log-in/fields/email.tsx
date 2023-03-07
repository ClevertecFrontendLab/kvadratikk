import { UseFormRegister } from 'react-hook-form';

import { Inputs } from '../../../interfaces/inputs';
import { emailErrors } from '../data';

export const Email = ({
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
        placeholder='E-mail'
        {...register('email', {
          required: true,
          validate: {
            checkMask: (value) =>
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                value
              ),
          },
          onBlur: () => {
            showBlurError();
          },
          onChange: () => {
            setIsBlurError(false);
          },
        })}
      />
      <div className='sign-in__tooltip'>{isBlurError ? showError() : emailErrors.default}</div>
    </label>
  );
};
