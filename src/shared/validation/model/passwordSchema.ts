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
    .test('password-requirements', '', (value) => {
      if (!value) return true;
      return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
    }),
});

export default passwordSchema;
