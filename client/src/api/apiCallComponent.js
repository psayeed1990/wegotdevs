import { Fragment, useEffect } from 'react';
import { apiCall } from '.';

const ApiCallComponent = ({
  setSuccess,
  setReturnValue,
  setApiCallComponent,
  setValue,
  setError,
  setOperationalError,
  reqType,
  url,
  reason,
  formInput,
}) => {
  useEffect(() => {
    const runApiCall = async () => {
      setOperationalError('');
      const data = await apiCall(reqType, url, reason, formInput);
      console.log(data);

      //success
      if (data.status === 'success') {
        const inputs = Object.keys(formInput);
        inputs.forEach((i) => {
          setValue(i, '');
        });

        setSuccess(true);
        setReturnValue(data);
      }

      //fail
      else if (data.response.data.status === 'fail') {
        const inputName = data.response.data.message.split(' ')[0].trim();
        const message = data.response.data.message
          .split(' ')
          .slice(1)
          .join(' ');

        setError(`${inputName}`, {
          type: 'manual',
          message: `${message}`.replace(/^\w/, (c) => c.toUpperCase()),
        });

        if (data.response.data.isOperational) {
          setOperationalError(data.response.data.message);
        }
      } else if (data.response.data.status === 'error') {
        setOperationalError(data.response.data.message);
      }

      //always set this to false to run the form again in case of error
      return setApiCallComponent(false);
    };

    runApiCall();
  }, []);

  return <Fragment></Fragment>;
};

export default ApiCallComponent;
