import styles from './SignUpPage.module.scss';

import SignUpForm from '../../features/authentication/signup';

function SignUpPage(): JSX.Element {
  return (
    <div className={styles.registrationPage}>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
