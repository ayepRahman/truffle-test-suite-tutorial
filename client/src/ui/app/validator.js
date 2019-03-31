import validate from 'validate.js';

// for validator options - https://validatejs.org/#validators

export const fieldNames = {
  name: 'name',
  age: 'age',
};

const constraints = {
  [fieldNames.name]: {
    presence: true,
  },
  [fieldNames.age]: {
    presence: true,
    numericality: {
      onlyInteger: true,
    },
  },
};

export const validator = values => {
  const response = validate(values, constraints);
  return response;
};
