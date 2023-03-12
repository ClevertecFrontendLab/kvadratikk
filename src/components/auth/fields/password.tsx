import { useState } from 'react';

import { ReactComponent as Check } from '../../../assets/icons/check.svg';
import { ReactComponent as Eye } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeClosed } from '../../../assets/icons/eye-closed.svg';

export const Password = ({
  validation,
  showTooltip,
  showBorder,
  showCheck,
  placeholder,
  isEmpty,
}: {
  validation: object;
  showTooltip: () => JSX.Element | JSX.Element[];
  showBorder: boolean;
  showCheck: boolean;
  placeholder?: string;
  isEmpty: boolean;
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <label className='auth__label'>
      <input
        className={showBorder ? 'border-error' : ''}
        type={isPasswordHidden ? 'password' : 'text'}
        autoComplete='current-password'
        placeholder={placeholder || 'Пароль'}
        {...validation}
      />
      {showCheck && <Check />}
      <button
        type='button'
        onClick={() => {
          setIsPasswordHidden(!isPasswordHidden);
        }}
      >
        {isEmpty ? '' : isPasswordHidden ? <EyeClosed /> : <Eye />}
      </button>

      {showTooltip()}
    </label>
  );
};
