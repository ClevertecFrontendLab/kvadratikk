export const Login = ({
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
      <input
        className={showBorder ? 'border-error' : ''}
        type='text'
        autoComplete='username'
        placeholder='Придумайте логин для входа'
        {...validation}
      />
      <div className='auth__tooltip'>{showTooltip()}</div>
    </label>
  );
};
