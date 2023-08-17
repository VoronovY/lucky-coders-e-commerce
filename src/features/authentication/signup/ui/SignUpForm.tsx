import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import RoutesName from '../../../../shared/routing';

import { TextInput, PasswordInput, DateInput, PasswordErrors } from '../../../../shared/ui';

import { FormText, FormWrapper } from '../../../../shared/ui/form';
import signUpSchema from '../model/signUpSchema';
import passwordErrorItems from '../../../../shared/constants/passwordErrorsItems';
import FieldArray from '../../../../shared/ui/addressFields/AddressFields';
import { RegisterUserFields } from '../../../../shared/types/types';

const defaultValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthDate: new Date(),
  address: [
    {
      country: undefined,
      city: '',
      street: '',
      postal: '',
    },
  ],
};

function SignUpForm(): JSX.Element {
  const methods = useForm<RegisterUserFields>({
    resolver: yupResolver(signUpSchema as ObjectSchema<RegisterUserFields>),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit: SubmitHandler<RegisterUserFields> = (data) => {
    return data;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormWrapper title="Create An account" buttonText="Sign Up">
          <Controller
            name="email"
            control={methods.control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  id="1"
                  placeholder="Email"
                  label="Email *"
                  {...field}
                  error={methods.formState.errors.email}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={methods.control}
            render={({ field, fieldState: { isDirty } }): JSX.Element => {
              return (
                <>
                  <PasswordInput
                    id="2"
                    placeholder="Password"
                    label="Password *"
                    {...field}
                    error={methods.formState.errors.password}
                  />
                  {isDirty && methods.formState.errors.password && (
                    <PasswordErrors value={field.value || ''} errorItems={passwordErrorItems} />
                  )}
                </>
              );
            }}
          />
          <Controller
            name="firstName"
            control={methods.control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  id="3"
                  placeholder="First name"
                  label="First name *"
                  error={methods.formState.errors.firstName}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="lastName"
            control={methods.control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  id="4"
                  placeholder="Last name"
                  label="Last name *"
                  error={methods.formState.errors.lastName}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="birthDate"
            control={methods.control}
            render={({ field: { onChange, value } }): JSX.Element => {
              return (
                <DateInput
                  id="6"
                  title="Birth date"
                  onChange={onChange}
                  value={value}
                  error={methods.formState.errors.birthDate}
                />
              );
            }}
          />
          <FieldArray />
          <FormText link={RoutesName.login} linkText="Sign In" text="Already have an account?" />
        </FormWrapper>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
