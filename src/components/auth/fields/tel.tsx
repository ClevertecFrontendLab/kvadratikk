import MaskedInput from 'react-text-mask';

export const Tel = ({
  validation,
  showTooltip,
  showBorder,
}: {
  validation: object;
  showTooltip: () => JSX.Element | JSX.Element[];
  showBorder: boolean;
}) => {
  return (
    <label className='auth__label'>
      <MaskedInput
        name='phone'
        mask={['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        className={showBorder ? 'border-error' : ''}
        type='tel'
        placeholder='Номер телефона'
        placeholderChar='x'
        {...validation}
      />
      {showTooltip()}
    </label>
  );
};
