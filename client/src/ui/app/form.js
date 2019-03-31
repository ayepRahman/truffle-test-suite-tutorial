import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import * as yup from 'yup';

import { TextField, Paper, DialogActions, Button } from '@material-ui/core';

export const fieldNames = {
  name: 'name',
  age: 'age',
};

const Form = ({ onSubmit }) => {
  const validate = async values => {
    let schema = yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required(),
    });

    try {
      await schema.isValid({});
    } catch (error) {}
  };

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate, // a record-level validation function to check all form values
  });

  const nameField = useField(fieldNames.name, form);
  const ageField = useField(fieldNames.age, form);

  const handleChange = field => event => {
    console.log(field);
    console.log(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id={fieldNames.name}
        name={fieldNames.name}
        fullWidth
        error={!!nameField.meta.touched && !!nameField.meta.error}
        label="Name"
        value={values[fieldNames.nameField]}
        // placeholder={currentUser.ethBalance}
        onChange={handleChange(nameField)}
        type=""
      />

      <TextField
        id={fieldNames.age}
        name={fieldNames.age}
        fullWidth
        error={!!ageField.meta.touched && !!ageField.meta.error}
        label="Age"
        value={values[fieldNames.age]}
        // placeholder={currentUser.ethBalance}
        onChange={handleChange(ageField)}
        type="number"
      />

      <DialogActions>
        <Button variant="outlined" type="submit" disabled={submitting}>
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};

Form.propTypes = {};

export default Form;
