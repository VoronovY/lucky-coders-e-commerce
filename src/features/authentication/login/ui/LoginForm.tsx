import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

import styles from './LoginForm.module.scss';

import { TextInput, PasswordInput } from '../../../../shared/ui';
import Button from '../../../../shared/ui/button/Button';

import RoutesName from '../../../../shared/routing';

interface LoginUserFields {
  email: string;
  password: string;
}

function LoginForm(): JSX.Element {
  const { handleSubmit, control } = useForm<LoginUserFields>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginUserFields> = (data) => {
    // console.log(data);
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
          return <TextInput id="1" placeholder="Email" label="Email *" {...field} />;
        }}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }): JSX.Element => {
          return <PasswordInput id="2" placeholder="Password" label="Password *" {...field} />;
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
