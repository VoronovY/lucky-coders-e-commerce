import styles from './LoginPage.module.scss';

import LoginForm from '../../features/authentication/login';
import RedirectToMain from '../../shared/helpers/redirectToMain';

function LoginPage(): JSX.Element {
  RedirectToMain();

  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
