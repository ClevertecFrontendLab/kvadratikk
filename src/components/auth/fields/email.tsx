export const Email = ({
  validation,
  showTooltip,
  showBorder,
}: {
  validation: object;
  showTooltip: () => string | JSX.Element[];
  showBorder: boolean;
}) => {
  return (
    <label className='auth__label'>
      <input className={showBorder ? 'border-error' : ''} type='email' placeholder='E-mail' {...validation} />
      <div className='auth__tooltip'>{showTooltip()}</div>
    </label>
  );
};
