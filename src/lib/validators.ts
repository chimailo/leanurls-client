import * as Yup from 'yup';

export const validateName = () =>
  Yup.string()
    .max(32, 'Must be 32 characters or less')
    .min(2, 'Must be at least 2 characters')
    .required('Required');

export const validateEmail = () =>
  Yup.string()
    .email('Invalid email address')
    .required('Email is required')

export const validatePassword = () =>
  Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Password is Required');

export const validatePasswordConfirm = () =>
  Yup.string()
    .required('You need to confirm your password')
    .nullable()
    .oneOf([Yup.ref('password'), null], 'Both password fields must match');

export const validateAlias = () =>
  Yup.string()
    .max(32, 'Must be 32 characters or less')
    .min(3, 'Must be 3 characters or more')
    .matches(/^[a-zA-Z0-9_-]*$/, {
      message: 'Must contain only valid characters (a-z, A-Z, 0-9, -, and _)',
      excludeEmptyString: true,
    })

export const validateLink = () =>
  Yup.string()
    .matches(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/, {
      message: 'Invalid url format',
      excludeEmptyString: true,
    })
