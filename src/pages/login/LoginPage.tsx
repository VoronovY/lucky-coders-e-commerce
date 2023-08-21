import styles from './LoginPage.module.scss';

import LoginForm from '../../features/authentication/login';
import RedirectToMain from '../../shared/helpers/redirectToMain';
import useScrollToTop from '../../shared/helpers/ScrollToTop';

function LoginPage(): JSX.Element {
  useScrollToTop();
  RedirectToMain();

  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
