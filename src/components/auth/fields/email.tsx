export const Email = ({
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
      <input
        name='email'
        className={showBorder ? 'border-error' : ''}
        type='email'
        placeholder='E-mail'
        {...validation}
      />

      {showTooltip()}
    </label>
  );
};
