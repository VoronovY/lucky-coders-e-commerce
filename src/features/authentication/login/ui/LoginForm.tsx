import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { useState } from 'react';

import { TextInput, PasswordInput, PasswordErrors } from '../../../../shared/ui';
import { FormWrapper, FormText } from '../../../../shared/ui/form';
import signInSchema from '../model/loginSchema';
import passwordErrorItems from '../../../../shared/constants/passwordErrorsItems';
import RoutesName from '../../../../shared/routing';
import { loginUser } from '../../../../shared/api/auth/loginUser';
import { getErrorLoginMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import myTokenCache from '../../../../shared/api/auth/tokenCache';
import useCreateUserAndNavigate from '../../../../shared/api/auth/userUtils';
import { useAppDispatch } from '../../../../app/appStore/hooks';
import { getCartAction } from '../../../../entities/cart/model/cartActions';

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
    resolver: yupResolver(signInSchema as ObjectSchema<LoginUserFields>),
    mode: 'onChange',
    defaultValues: initLoginForm,
  });

  const createUserAndNavigate = useCreateUserAndNavigate();
  const dispatch = useAppDispatch();

  const disableSubmit = Object.values(errors).length > 0;
  const onSubmit: SubmitHandler<LoginUserFields> = (data) => {
    setErrorMessage('');

    if (localStorage.getItem('anonymousToken')) {
      loginUser(data.email, data.password)
        .then(() => {
          localStorage.removeItem('anonymousToken');
          localStorage.removeItem('anonymousCartId');
          myTokenCache.clear();

          return createUserAndNavigate(data.email, data.password);
        })
        .catch((error) => {
          setErrorMessage(getErrorLoginMessage(error.body));
        })
        .finally(() => {
          dispatch(getCartAction());
        });
    } else {
      createUserAndNavigate(data.email, data.password)
        .catch((error) => {
          setErrorMessage(getErrorLoginMessage(error.body));
        })
        .finally(() => {
          dispatch(getCartAction());
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
