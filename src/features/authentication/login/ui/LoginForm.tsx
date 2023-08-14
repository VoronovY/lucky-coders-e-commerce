import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { TextInput, PasswordInput, PasswordErrors } from '../../../../shared/ui';

import FormWrapper from '../../../../shared/ui/form/FormWrapper';
import loginSchema from '../model/loginSchema';

interface LoginUserFields {
  email: string;
  password: string;
}

function LoginForm(): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUserFields>({
    resolver: yupResolver(loginSchema as ObjectSchema<LoginUserFields>),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginUserFields> = (data) => {
    return data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper title="Log in to your account">
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
                {fieldState.isDirty && errors.password && <PasswordErrors value={field.value || ''} />}
              </>
            );
          }}
        />
      </FormWrapper>
    </form>
  );
}

export default LoginForm;
