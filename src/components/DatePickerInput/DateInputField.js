import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import { connect } from "formik";
import propTypes from "prop-types";

import {
  ElementWrap,
  LabelWrap,
  HelperText,
  ErrorContainer,
  InputWrap
} from "../../Scaffolding/Scaffolding";

import "./date-input-field.scss";
import "react-day-picker/lib/style.css";

export function DateInputField({
  label,
  name,
  helperText = "",
  className = "",
  value,
  formik
}) {
  const {setFieldTouched, setFieldValue, values} = formik;
  let fieldValue;

  if (value) {
    fieldValue = value;
  } else {
    fieldValue = values[name];
  }

  return (
    <ElementWrap className={className}>
      <LabelWrap name={name}>
        <label htmlFor={name}>{label || name}</label>
        <HelperText text={helperText} />
      </LabelWrap>
      <InputWrap name={name}>
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          onDayChange={value => setFieldValue(name, value)}
          onDayPickerHide={() => setFieldTouched(name, true)}
          value={fieldValue}
          name={name}
          placeholder={`${formatDate(new Date())}`}
        />
      </InputWrap>
      <ErrorContainer name={name} />
    </ElementWrap>
  );
}

DateInputField.propTypes = {
  /** Will populate the label field */
  label: propTypes.string,
  className: propTypes.string,
  name: propTypes.string.isRequired,
  helperText: propTypes.string.isRequired,
  setFieldTouched: propTypes.func,
  setFieldValue: propTypes.func
};

export default connect(DateInputField);
