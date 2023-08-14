import { Link } from 'react-router-dom';

import styles from './FormWrapper.module.scss';

import Button from '../button/Button';
import RoutesName from '../../routing';

interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
}

function FormWrapper({ title, children }: FormWrapperProps): JSX.Element {
  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.line} />

      {children}

      {title === 'Log in to your account' ? (
        <p className={styles.signUpText}>
          Don&apos;t have an account?&nbsp;
          <Link to={RoutesName.registration}>Sign Up</Link>
        </p>
      ) : (
        <p className={styles.signUpText}>
          Already have an account?&nbsp;
          <Link to={RoutesName.login}>Sign In</Link>
        </p>
      )}
      <div className={`${styles.line} ${styles.bottom}`} />
      <Button type="submit" height="48px" width="80%">
        {title === 'Log in to your account' ? 'Sign In' : 'Sign up'}
      </Button>
    </div>
  );
}

export default FormWrapper;
