import { useForm } from 'react-hook-form';
import styles from './FormComponent.module.css';
import { Suspense, lazy, Fragment, useState } from 'react';
import ApiCallComponent from '../../api/apiCallComponent';
import TextField from './formFields/TextField';
import EmailField from './formFields/EmailField';
import PasswordWithConfirmField from './formFields/PasswordWithConfirm';
import PasswordConfirmField from './formFields/PasswordConfirmField';
import PasswordField from './formFields/PasswordField';
import CustomTypeTextField from './formFields/CustomTypeTextField';
import CustomSelectField from './formFields/CustomSelectField';
// const TextField = lazy(() => import('./formFields/TextField'));
// const EmailField = lazy(() => import('./formFields/EmailField'));
// const PasswordWithConfirmField = lazy(() =>
//   import('./formFields/PasswordWithConfirm')
// );
// const PasswordConfirmField = lazy(() =>
//   import('./formFields/PasswordConfirmField')
// );
// const PasswordField = lazy(() => import('./formFields/PasswordField'));
// const CustomTypeTextField = lazy(() =>
//   import('./formFields/CustomTypeTextField')
// );
// const CustomSelectField = lazy(() => import('./formFields/CustomSelectField'));

const FormComponent = ({
  setReturnValue,
  setSuccess,
  submitValue,
  reason,
  reqType,
  url,
  formBuilder,
  submitBtnExtra,
}) => {
  //   const isServer = typeof window === 'undefined';
  const [apiCallComponent, setApiCallComponent] = useState(false);
  const [apiData, setApiData] = useState({});
  const [operationalError, setOperationalError] = useState('');
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
    setError,
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    setApiData(data);
    setApiCallComponent(true);
  };

  return (
    <Fragment>
      {apiCallComponent ? (
        <ApiCallComponent
          setSuccess={setSuccess}
          setReturnValue={setReturnValue}
          setApiCallComponent={setApiCallComponent}
          setError={setError}
          setValue={setValue}
          setOperationalError={setOperationalError}
          reqType={reqType}
          url={url}
          reason={reason}
          formInput={apiData}
        />
      ) : (
        <Fragment></Fragment>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="error">{operationalError}</p>
        {/* {!isServer && (
          <Suspense fallback={<></>}> */}
        {formBuilder?.map((f, i) => {
          return (
            <Fragment key={i}>
              {f.fieldType === 'CustomTypeTextField' && (
                <CustomTypeTextField
                  value={f.value}
                  label={f.label}
                  customTypesArray={f.customTypesArray}
                  initFocus={f.initFocus}
                  placeholder={f.placeholder}
                  maxChar={f.maxChar}
                  minChar={f.minChar}
                  isRequired={f.isRequired}
                  fieldName={f.fieldName}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              )}
              {f.fieldType === 'TextField' && (
                <TextField
                  value={f.value}
                  label={f.label}
                  initFocus={f.initFocus}
                  placeholder={f.placeholder}
                  maxChar={f.maxChar}
                  minChar={f.minChar}
                  isRequired={f.isRequired}
                  fieldName={f.fieldName}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              )}
              {f.fieldType === 'EmailField' && (
                <EmailField
                  value={f.value}
                  label={f.label}
                  initFocus={f.initFocus}
                  placeholder={f.placeholder}
                  isRequired={f.isRequired}
                  fieldName={f.fieldName}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              )}
              {f.fieldType === 'PasswordWithConfirmField' && (
                <PasswordWithConfirmField
                  value={f.value}
                  label={f.label}
                  initFocus={f.initFocus}
                  placeholder={f.placeholder}
                  maxChar={f.maxChar}
                  minChar={f.minChar}
                  isRequired={f.isRequired}
                  fieldName={f.fieldName}
                  otherFieldName={f.otherFieldName}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              )}
              {f.fieldType === 'PasswordConfirmField' && (
                <PasswordConfirmField
                  value={f.value}
                  label={f.label}
                  initFocus={f.initFocus}
                  placeholder={f.placeholder}
                  maxChar={f.maxChar}
                  minChar={f.minChar}
                  isRequired={f.isRequired}
                  fieldName={f.fieldName}
                  otherFieldName={f.otherFieldName}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              )}
              {f.fieldType === 'PasswordField' && (
                <PasswordField
                  value={f.value}
                  label={f.label}
                  initFocus={f.initFocus}
                  placeholder={f.placeholder}
                  maxChar={f.maxChar}
                  minChar={f.minChar}
                  isRequired={f.isRequired}
                  fieldName={f.fieldName}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              )}
              {f.fieldType === 'CustomSelectField' && (
                <CustomSelectField
                  value={f.value}
                  label={f.label}
                  customTypesArray={f.customTypesArray}
                  selectMenuArray={f.selectMenuArray}
                  initFocus={f.initFocus}
                  nameToShowOnList={f.nameToShowOnList}
                  nameToUseAsValue={f.nameToUseAsValue}
                  placeholder={f.placeholder}
                  maxChar={f.maxChar}
                  minChar={f.minChar}
                  isRequired={f.isRequired}
                  fieldName={f.fieldName}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              )}
            </Fragment>
          );
        })}
        {/* </form></Suspense>
        )} */}
        <input
          id="hidden"
          name="hidden"
          type="hidden"
          placeholder="hidden"
          autoComplete="on"
        />

        <div className="form-group">
          <input id="submit" type="submit" value={submitValue} />
          <div className={`${styles.forgotBtn} forgot-btn`}>
            {submitBtnExtra}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default FormComponent;
