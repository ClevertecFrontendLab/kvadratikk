import { UseFormRegister } from 'react-hook-form';

import { Inputs } from '../../../interfaces/inputs';

export const Surname = ({
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
        placeholder='Фамилия'
        {...register('surname', {
          required: true,
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
