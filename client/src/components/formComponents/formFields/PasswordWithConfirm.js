import { useEffect } from 'react';

const PasswordWithConfirmField = ({
  value,
  label,
  initFocus,
  placeholder,
  maxChar,
  minChar,
  isRequired,
  fieldName,
  otherFieldName,
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
          maxLength: {
            value: maxChar,
            message: `Max ${maxChar} character`,
          },
          minLength: {
            value: minChar,
            message: `Min ${minChar} character`,
          },
        })}
        id={fieldName}
        autoFocus={initFocus}
        name={fieldName}
        type="password"
        placeholder={placeholder}
        autoComplete="new-password"
        onChange={() => {
          if (getValues(fieldName) !== getValues(otherFieldName)) {
            setError(otherFieldName, {
              type: 'manual',
              message: 'Password should match ',
            });
          } else {
            clearErrors(otherFieldName);
          }
        }}
      />
      <label htmlFor={fieldName}>{label}</label>
      <span className={`${errors[fieldName] ? 'error' : ''}`}>
        {errors[fieldName]?.message}
      </span>
    </div>
  );
};

export default PasswordWithConfirmField;
