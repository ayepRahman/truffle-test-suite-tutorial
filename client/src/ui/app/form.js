import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';

import { TextField, DialogActions, Button } from '@material-ui/core';
import { validator, fieldNames } from './validator';

const Form = ({ onSubmit }) => {
  const { form, handleSubmit, submitting } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate: validator, // a record-level validation function to check all form values
  });

  const nameField = useField(fieldNames.name, form);
  const ageField = useField(fieldNames.age, form);

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-3">
        <TextField
          id={fieldNames.name}
          name={fieldNames.name}
          fullWidth
          error={!!nameField.meta.touched && !!nameField.meta.error}
          label={!!nameField.meta.touched && !!nameField.meta.error ? nameField.meta.error : 'Name'}
          onChange={nameField.input.onChange}
          type="text"
        />
      </div>

      <div className="pb-3">
        <TextField
          id={fieldNames.age}
          name={fieldNames.age}
          fullWidth
          error={!!ageField.meta.touched && !!ageField.meta.error}
          label={!!ageField.meta.touched && !!ageField.meta.error ? ageField.meta.error : 'Age'}
          onChange={ageField.input.onChange}
          type="number"
        />
      </div>

      <DialogActions>
        <Button variant="outlined" type="submit" disabled={submitting}>
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
