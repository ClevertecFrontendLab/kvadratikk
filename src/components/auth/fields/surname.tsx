export const Surname = ({
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
        name='lastName'
        className={showBorder ? 'border-error' : ''}
        type='text'
        placeholder='Фамилия'
        {...validation}
      />

      {showTooltip()}
    </label>
  );
};
