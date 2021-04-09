import React from 'react';
import TimeViewer from 'rc-time-picker';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function TimePicker(props) {
  const {label, name, ...otherProps } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br/>
      <Field name={name}>
      {
        ({form, field}) => {
          const { setFieldValue } = form;
          const {value} = field;
          return(
            <TimeViewer 
              id={name}
              {...field}
              {...otherProps}
              showSecond={false}
              minuteStep={30}
              disabledHours={()=>[0,1,2,3,4,5,6,7,21,22,23]}
              hideDisabledOptions
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          )
        }
      }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default TimePicker;
