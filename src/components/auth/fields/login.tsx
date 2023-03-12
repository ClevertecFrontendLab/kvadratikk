export const Login = ({
  validation,
  showTooltip,
  showBorder,
  placeholder,
}: {
  validation: object;
  showTooltip: () => JSX.Element | JSX.Element[];
  showBorder: boolean;
  placeholder?: string;
}) => {
  return (
    <label className='auth__label'>
      <input
        className={showBorder ? 'border-error' : ''}
        type='text'
        autoComplete='username'
        placeholder={placeholder || 'Придумайте логин для входа'}
        {...validation}
      />
      {showTooltip()}
    </label>
  );
};
