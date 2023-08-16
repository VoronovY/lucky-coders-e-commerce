import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { useState } from 'react';

import { TextInput, PasswordInput, PasswordErrors } from '../../../../shared/ui';

import { FormWrapper, FormText } from '../../../../shared/ui/form';

import loginSchema from '../model/loginSchema';
import passwordErrorItems from '../../../../shared/constants/passwordErrorsItems';
import RoutesName from '../../../../shared/routing';
import loginUser from '../api/loginUser';

import ModalErrors from '../../../../shared/ui/modalErrors/ModalErrors';

interface LoginUserFields {
  email: string;
  password: string;
}

const initLoginForm = {
  email: '',
  password: '',
};

function LoginForm(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUserFields>({
    resolver: yupResolver(loginSchema as ObjectSchema<LoginUserFields>),
    mode: 'onChange',
    defaultValues: initLoginForm,
  });

  const onSubmit: SubmitHandler<LoginUserFields> = (data) => {
    setErrorMessage('');

    loginUser(data.email, data.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.body.statusCode >= 500 && error.body.statusCode < 600) {
          setErrorMessage('An internal server error has occurred. Please try again later.');
        } else if (error.body.statusCode === 400) {
          setErrorMessage('Invalid email or password');
        } else if (error.body.statusCode === 404) {
          setErrorMessage('Resource not found');
        } else {
          setErrorMessage('Unhandled error');
        }
      });
  };

  return (
    <>
      {errorMessage && <ModalErrors errorMessage={errorMessage} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper title="Log in to your account" buttonText="Sign In">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }): JSX.Element => {
              return <TextInput id="1" placeholder="Email" label="Email *" {...field} error={errors.email} />;
            }}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }): JSX.Element => {
              return (
                <>
                  <PasswordInput id="2" placeholder="Password" label="Password *" {...field} error={errors.password} />
                  {fieldState.isDirty && errors.password && (
                    <PasswordErrors value={field.value || ''} errorItems={passwordErrorItems} />
                  )}
                </>
              );
            }}
          />
          <FormText link={RoutesName.registration} linkText="Sign Up" text="Don't have an account?" />
        </FormWrapper>
      </form>
    </>
  );
}

export default LoginForm;
