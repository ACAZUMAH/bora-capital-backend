import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import createError from 'http-errors';
import { CreateUserInput } from 'src/common/interfaces';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

ajv.addFormat('phone', {
  type: 'string',
  validate: (value: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(value);
  },
});

ajv.addFormat('password', {
  type: 'string',
  validate: (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(value);
  },
});

const userValidationSchema = {
  type: 'object',

  properties: {
    email: { type: 'string', format: 'email' },
    phoneNumber: { type: 'string', format: 'phone' },
    password: { type: 'string' },
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
    dateOfBirth: { type: 'string', minLength: 1 },
    gender: { type: 'string', minLength: 1 },
  },

  additionalProperties: false,

  required: [
    'email',
    'password',
    'phoneNumber',
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
  ],

  errorMessage: {
    properties: {
      email: 'Email must be a valid email address',
      phoneNumber: 'Phone number must be a valid international format',
      password:
        'Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character',
      firstName: 'First name is required',
      lastName: 'Last name is required',
      dateOfBirth: 'Date of birth is required',
      gender: 'Gender is required',
    },

    required: {
      email: 'Email is required',
      password: 'Password is required',
      phoneNumber: 'Phone number is required',
      firstName: 'First name is required',
      lastName: 'Last name is required',
      dateOfBirth: 'Date of birth is required',
      gender: 'Gender is required',
    },
  },
};

export const validateCreateUserData = (data: CreateUserInput) => {
  const validate = ajv.compile(userValidationSchema);

  const isValid = validate(data);

  if (!isValid) {
    throw createError(400, ajv.errorsText(validate.errors));
  }
};
