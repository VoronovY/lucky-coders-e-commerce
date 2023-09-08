import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { TextInput, PasswordInput, PasswordErrors } from '../../../../shared/ui';

import { FormWrapper, FormText } from '../../../../shared/ui/form';
import signInSchema from '../model/loginSchema';
import passwordErrorItems from '../../../../shared/constants/passwordErrorsItems';
import RoutesName from '../../../../shared/routing';
import { createUser, loginUser } from '../../../../shared/api/auth/loginUser';

import { getErrorLoginMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import myTokenCache from '../../../../shared/api/auth/tokenCache';
import { useAppDispatch } from '../../../../app/appStore/hooks';
import {
  updateAccessToken,
  updateInfoMessage,
  updateIsModalInfoOpen,
  updateUserId,
} from '../../../../shared/model/appSlice';
import SuccessfulMessages from '../../../../shared/successfulMessages';

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUserFields>({
    resolver: yupResolver(signInSchema as ObjectSchema<LoginUserFields>),
    mode: 'onChange',
    defaultValues: initLoginForm,
  });

  const createUserAndNavigate = async (email: string, password: string): Promise<void> => {
    const res = await createUser(email, password);
    dispatch(updateUserId(res.body.id));
    dispatch(updateAccessToken(myTokenCache.store.token));
    dispatch(updateInfoMessage(SuccessfulMessages.signIn));
    dispatch(updateIsModalInfoOpen(true));
    setTimeout(() => {
      dispatch(updateIsModalInfoOpen(false));
      dispatch(updateInfoMessage(''));
    }, 5000);
    localStorage.setItem('accessToken', myTokenCache.store.token);
    navigate(RoutesName.main);
  };

  const disableSubmit = Object.values(errors).length > 0;
  const onSubmit: SubmitHandler<LoginUserFields> = (data) => {
    setErrorMessage('');

    if (localStorage.getItem('anonymousToken')) {
      loginUser(data.email, data.password)
        .then((response) => {
          console.log(response.body);
          localStorage.removeItem('anonymousToken');
          localStorage.removeItem('anonymousCartId');
          myTokenCache.clear();

          createUserAndNavigate(data.email, data.password);
        })
        .catch((error) => {
          setErrorMessage(getErrorLoginMessage(error.body));
        });
    } else {
      createUserAndNavigate(data.email, data.password).catch((error) => {
        setErrorMessage(getErrorLoginMessage(error.body));
      });
    }
  };

  return (
    <>
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper title="Log in to your account" buttonText="Sign In" disableBtn={disableSubmit}>
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
