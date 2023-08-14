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
  email: string()
    .required('Email is required')
    .test(
      'no-leading-trailing-whitespace',
      'Email address must not contain leading or trailing whitespace',
      (value) => {
        if (!value) return true;
        return !(value.startsWith(' ') || value.endsWith(' '));
      },
    )
    .test('contains-at-symbol', "Email address must contain an '@' symbol", (value) => {
      if (!value) return true;
      return value.includes('@');
    })
    .test('contains-domain', 'Email address must contain a domain name (e.g., example.com)', (value) => {
      if (!value) return true;
      const trimmedValue = value.replace(/\s/g, '');
      const domainRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      const isValidFormat = domainRegex.test(trimmedValue);
      const hasDomainName = trimmedValue.split('@')[1]?.length > 0;
      return isValidFormat && hasDomainName;
    }),
  password: string()
    .required('Password is required')
    .test('no-leading-trailing-whitespace', 'Password must not contain leading or trailing whitespace', (value) => {
      if (!value) return true;
      return !(value.startsWith(' ') || value.endsWith(' '));
    })
    .test('password-requirements', '', (value) => {
      if (!value) return true;
      return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
    }),
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
    const cleanedData = {
      email: data.email.replace(/\s/g, ''),
      password: data.password?.replace(/\s/g, ''),
    };

    console.log(cleanedData);
    return cleanedData;
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
          const hasMinLength = (field.value ?? '').length >= 8;
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
                        {errors.password && !hasMinLength ? <CheckedRedIcon /> : <CheckedGreenIcon />}
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
