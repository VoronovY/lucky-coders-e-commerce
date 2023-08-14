import styles from './LoginPage.module.scss';

import LoginForm from '../../features/authentication/login';

function LoginPage(): JSX.Element {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
