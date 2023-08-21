import styles from './SignUpPage.module.scss';

import SignUpForm from '../../features/authentication/signup';
import RedirectToMain from '../../shared/helpers/redirectToMain';

function SignUpPage(): JSX.Element {
  window.scrollTo(0, 0);
  RedirectToMain();

  return (
    <div className={styles.signUpPage}>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
