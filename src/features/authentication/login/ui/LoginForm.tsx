import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { TextInput, PasswordInput, PasswordErrors } from '../../../../shared/ui';

import { FormWrapper, FormText } from '../../../../shared/ui/form';
import loginSchema from '../model/loginSchema';
import passwordErrorItems from '../../../../shared/constants/passwordErrorsItems';
import RoutesName from '../../../../shared/routing';
import loginUser from '../api/loginUser';

interface LoginUserFields {
  email: string;
  password: string;
}

const initLoginForm = {
  email: '',
  password: '',
};

function LoginForm(): JSX.Element {
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
    loginUser(data.email, data.password);
  };

  return (
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
  );
}

export default LoginForm;
