import { ObjectSchema, object, string } from 'yup';

interface PasswordFieldScheme {
  password: string;
}

const passwordSchema: ObjectSchema<PasswordFieldScheme> = object().shape({
  password: string()
    .required('Password is required')
    .test('no-leading-trailing-whitespace', 'Password must not contain leading or trailing whitespace', (value) => {
      if (!value) return true;
      return !(value.startsWith(' ') || value.endsWith(' '));
    })
    .test('no-whitespace-in-middle', 'Password must not contain whitespace in the middle of the string', (value) => {
      if (!value) return true;
      return !/\S\s+\S/.test(value);
    })
    .test('password-requirements', '', (value) => {
      if (!value) return true;
      return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
    }),
});

export default passwordSchema;
