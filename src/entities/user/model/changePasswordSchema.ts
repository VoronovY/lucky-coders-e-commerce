import { object } from 'yup';
import * as Yup from 'yup';

import { leadingTrailingWhitespaceTest, whitespaceInMiddleTest } from '../../../shared/helpers/validationFunctions';

const changePasswordSchema = object().shape({
  currentPassword: Yup.string().required('Password is required'),
  newPassword: Yup.string()
    .required('Password is required')
    .test(
      'no-leading-trailing-whitespace',
      'Password must not contain leading or trailing whitespace',
      leadingTrailingWhitespaceTest,
    )
    .test(
      'no-whitespace-in-middle',
      'Password must not contain whitespace in the middle of the string',
      whitespaceInMiddleTest,
    )
    .test('password-uppercase', 'Password must contain at least one uppercase letter', (value) => {
      if (!value) return true;
      return /[A-Z]/.test(value);
    })
    .test('password-lowercase', 'Password must contain at least one lowercase letter', (value) => {
      if (!value) return true;
      return /[a-z]/.test(value);
    })
    .test('password-digit', 'Password must contain at least one digit', (value) => {
      if (!value) return true;
      return /\d/.test(value);
    })
    .test('password-length', 'Password must have at least 8 characters', (value) => {
      if (!value) return true;
      return value.length >= 8;
    }),
  confirmPassword: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

export default changePasswordSchema;
