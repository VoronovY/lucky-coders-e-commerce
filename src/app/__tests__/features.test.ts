import signInSchema from '../../features/authentication/login/model/loginSchema';
import signUpSchema from '../../features/authentication/signup/model/signUpSchema';

describe('signInSchema', () => {
  it('should throw an error for an invalid sign-in object', async () => {
    const invalidSignIn = {
      email: 'invalidemail',
      password: 'short',
    };

    await expect(signInSchema.validate(invalidSignIn)).rejects.toThrowError();
  });
});

describe('signUpSchema', () => {
  it('should throw an error for an invalid sign-up object', async () => {
    const invalidSignUp = {
      email: 'invalidemail',
      password: 'short',
      firstName: '',
      lastName: '',
      birthDate: '2022-01-01',
      address: [
        {
          country: 'USA',
          city: '',
          street: '',
          postalCode: 'ABCDE',
        },
      ],
    };

    await expect(signUpSchema.validate(invalidSignUp)).rejects.toThrowError();
  });
});
