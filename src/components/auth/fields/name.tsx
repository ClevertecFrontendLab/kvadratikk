export const Name = ({
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
        name='firstName'
        className={showBorder ? 'border-error' : ''}
        type='text'
        placeholder='Имя'
        {...validation}
      />

      {showTooltip()}
    </label>
  );
};
