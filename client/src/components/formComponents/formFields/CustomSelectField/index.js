import { Fragment, useEffect, useState } from 'react';
import styles from './CustomSelectField.module.css';

const CustomSelectField = ({
  nameToShowOnList,
  nameToUseAsValue,
  value,
  label,
  selectMenuArray,
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
  const [showSelectList, setShowSelectList] = useState(false);
  const [selectList, setSelectList] = useState(null);

  useEffect(() => {
    if (value) {
      setValue(fieldName, value);
    }
  }, []);

  //set array to loaded value
  useEffect(() => {
    if (selectMenuArray) {
      setSelectList(selectMenuArray);
    }
  }, [selectMenuArray]);

  // showing select list
  const showSelectMenu = () => {
    if (showSelectList) {
      return setShowSelectList(false);
    }

    setShowSelectList(true);
  };

  //set mark sign
  useEffect(() => {
    if (getValues(fieldName) && showSelectList) {
      document.getElementById(`${getValues(fieldName)}-mark`).innerHTML = '✔️';
    }
  }, [showSelectList]);

  //set form value of select
  const setSelectValue = (n, v) => {
    setValue(fieldName, v);
    console.log(getValues(fieldName));
    document.getElementById(`selected-value-${fieldName}`).innerHTML = n;

    return setShowSelectList(false);
  };

  // // hide clicking outside the div. this one overrides all other click function
  document.addEventListener('mousedown', (e) => {
    // e.preventDefault();
    if (e.target.id === `select-menu-${fieldName}`) {
      return;
    }

    return setShowSelectList(false);
  });

  //setting value for select form
  return (
    <Fragment>
      <div className="form-group">
        <div
          className="select-menu"
          id={`select-menu-${fieldName}`}
          onClick={showSelectMenu}
        >
          Select {label}
          <p id={`selected-value-${fieldName}`}></p>
        </div>

        {showSelectList && (
          <div className={styles.selectList}>
            <ul>
              {selectList?.map((list) => {
                let theName = list[nameToShowOnList];
                let theValue = list[nameToUseAsValue];
                let markingId = `${theValue}-mark`;
                return (
                  <li
                    key={theValue}
                    id={theValue}
                    onMouseDown={() => {
                      setSelectValue(theName, theValue);
                    }}
                  >
                    {theName}
                    <span id={markingId}></span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <input
          type="text"
          className={styles.hidden}
          {...register(fieldName, {
            required: isRequired ? `${fieldName} is required` : false,
          })}
          id={fieldName}
          autoFocus={initFocus}
          name={fieldName}
        />

        <label htmlFor={fieldName}>{label}</label>
        <span className={`${errors[fieldName] ? 'error' : ''}`}>
          {errors[fieldName] && errors[fieldName].message}
        </span>
      </div>
    </Fragment>
  );
};

export default CustomSelectField;
