import { useEffect } from 'react';

const EmailField = ({
  value,
  label,
  initFocus,
  placeholder,
  maxChar,
  minChar,
  isRequired,
  fieldName,
  register,
  setValue,
  errors,
  setError,
  clearErrors,
  getValues,
}) => {
  useEffect(() => {
    if (value) {
      setValue(fieldName, value);
    }
  }, []);
  return (
    <div className="form-group">
      <input
        {...register(fieldName, {
          required: isRequired ? `${fieldName} is required` : false,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address format',
          },
        })}
        id={fieldName}
        autoFocus={initFocus}
        // name={fieldName}
        type="text"
        placeholder={placeholder}
        autoComplete="new-password"
      />
      <label htmlFor={fieldName}>{label}</label>
      <span className={typeof errors[fieldName] == undefined ? '' : 'error'}>
        {errors[fieldName]?.message}
      </span>
    </div>
  );
};

export default EmailField;
