import styles from './SignUpPage.module.scss';

import SignUpForm from '../../features/authentication/signup';
import RedirectToMain from '../../shared/helpers/redirectToMain';
import useScrollToTop from '../../shared/helpers/ScrollToTop';

function SignUpPage(): JSX.Element {
  useScrollToTop();
  RedirectToMain();

  return (
    <div className={styles.signUpPage}>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
