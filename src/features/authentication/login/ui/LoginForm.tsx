import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema, object, string } from 'yup';

import styles from './LoginForm.module.scss';

import { TextInput, PasswordInput } from '../../../../shared/ui';
import Button from '../../../../shared/ui/button/Button';

import RoutesName from '../../../../shared/routing';
import { CheckedGreenIcon, CheckedRedIcon } from '../../../../app/layouts/images';

interface LoginUserFieldsScheme {
  email: string;
}

const userSchema: ObjectSchema<LoginUserFieldsScheme> = object().shape({
  email: string().required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
    .matches(/\d/, 'Password must contain at least one digit (0-9)'),
});
interface LoginUserFields {
  email: string;
  password?: string;
}

function LoginForm(): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUserFields>({
    resolver: yupResolver(userSchema),
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
          const hasUppercase = /[A-Z]/.test(field.value || '');
          const hasLowercase = /[a-z]/.test(field.value || '');
          const hasDigit = /\d/.test(field.value || '');
          return (
            <>
              <PasswordInput id="2" placeholder="Password" label="Password *" {...field} error={errors.password} />
              {fieldState.isDirty && errors.password && (
                <>
                  <span>The password must contain:</span>
                  <div className={styles.errorList}>
                    <div>
                      <div className={styles.errorItem}>
                        {errors.password && errors.password.type === 'min' ? <CheckedRedIcon /> : <CheckedGreenIcon />}
                        <span>at least 8 characters</span>
                      </div>
                      <div className={styles.errorItem}>
                        {errors.password && !hasUppercase ? <CheckedRedIcon /> : <CheckedGreenIcon />}
                        <span>at least one uppercase letter (A-Z)</span>
                      </div>
                    </div>
                    <div>
                      <div className={styles.errorItem}>
                        {errors.password && !hasLowercase ? <CheckedRedIcon /> : <CheckedGreenIcon />}
                        <span>at least one lowercase letter (a-z)</span>
                      </div>
                      <div className={styles.errorItem}>
                        {errors.password && !hasDigit ? <CheckedRedIcon /> : <CheckedGreenIcon />}
                        <span>at least one digit (0-9)</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
