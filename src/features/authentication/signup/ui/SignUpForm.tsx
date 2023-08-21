import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import RoutesName from '../../../../shared/routing';

import { getErrorLoginMessage, getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';

import { TextInput, PasswordInput, DateInput, PasswordErrors } from '../../../../shared/ui';

import { FormText, FormWrapper } from '../../../../shared/ui/form';
import signUpSchema from '../model/signUpSchema';
import passwordErrorItems from '../../../../shared/constants/passwordErrorsItems';
import FieldArray from '../../../../shared/ui/addressFields/AddressFields';
import { RegisterUserFields } from '../../../../shared/types/types';
import signUp from '../../../../shared/api/signUp/signUpUser';
import { signUpConverter } from '../../../../shared/helpers/signUpHelpers';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import loginUser from '../../../../shared/api/auth/loginUser';
import {
  updateAccessToken,
  updateInfoMessage,
  updateIsModalInfoOpen,
  updateUserId,
} from '../../../../shared/model/appSlice';
import myTokenCache from '../../../../shared/api/auth/tokenCache';

const defaultValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthDate: new Date(),
  address: [
    {
      isBillingAddress: false,
      isShippingAddress: false,
      country: null,
      city: '',
      street: '',
      postalCode: '',
    },
  ],
};

function SignUpForm(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm<RegisterUserFields>({
    resolver: yupResolver(signUpSchema as ObjectSchema<RegisterUserFields>),
    mode: 'onChange',
    defaultValues,
  });

  const disableSubmit = Object.values(methods.formState.errors).length > 0;

  const onSubmit: SubmitHandler<RegisterUserFields> = (data) => {
    setErrorMessage('');
    const convertedData = signUpConverter(data);
    signUp(convertedData)
      .then(() => {
        loginUser(data.email, data.password)
          .then((response) => {
            dispatch(updateUserId(response.body.customer.id));
            dispatch(updateAccessToken(myTokenCache.store.token));
            dispatch(updateInfoMessage('Congratulations! Your account has been successfully created.'));
            dispatch(updateIsModalInfoOpen(true));
            setTimeout(() => {
              dispatch(updateIsModalInfoOpen(false));
              dispatch(updateInfoMessage(''));
            }, 3000);
            localStorage.setItem('accessToken', myTokenCache.store.token);
            navigate(RoutesName.main);
          })
          .catch((error) => {
            setErrorMessage(getErrorLoginMessage(error.body));
          });
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  return (
    <>
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormWrapper title="Create An account" buttonText="Sign Up" disableBtn={disableSubmit}>
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
                    title="Birth date *"
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
    </>
  );
}

export default SignUpForm;
