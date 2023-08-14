import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema, object } from 'yup';

import styles from './LoginForm.module.scss';

import emailSchema from '../../../../shared/validation/model/emailSchema';
import passwordSchema from '../../../../shared/validation/model/passwordSchema';

import { TextInput, PasswordInput, PasswordErrors } from '../../../../shared/ui';
import Button from '../../../../shared/ui/button/Button';

import RoutesName from '../../../../shared/routing';

const userSchema = object().shape({ ...emailSchema.fields, ...passwordSchema.fields });
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
    resolver: yupResolver(userSchema as ObjectSchema<LoginUserFields>),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginUserFields> = (data) => {
    console.log(data);
    return data;
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Log in to your account</h3>
      <div className={styles.line} />
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
      <p className={styles.signUpText}>
        Already have an account?&nbsp;
        <Link to={RoutesName.registration}>Sign Up</Link>
      </p>
      <div className={`${styles.line} ${styles.bottom}`} />
      <Button type="submit" height="48px" width="80%">
        Sign In
      </Button>
    </form>
  );
}

export default LoginForm;
