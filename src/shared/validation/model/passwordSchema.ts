import { ObjectSchema, object, string } from 'yup';

import { leadingTrailingWhitespaceTest, whitespaceInMiddleTest } from '../../helpers/whitespaceTests';

interface PasswordFieldScheme {
  password: string;
}

const passwordSchema: ObjectSchema<PasswordFieldScheme> = object().shape({
  password: string()
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
    .test('password-requirements', '', (value) => {
      if (!value) return true;
      return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
    }),
});

export default passwordSchema;
