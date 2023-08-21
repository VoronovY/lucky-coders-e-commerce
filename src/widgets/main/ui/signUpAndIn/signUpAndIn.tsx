import { Link } from 'react-router-dom';

import styles from './signUpAndIn.module.scss';

import Button from '../../../../shared/ui/button/Button';
import RoutesName from '../../../../shared/routing';

function SignUpAndIn(): JSX.Element {
  return (
    <div className={styles.signUpAndIn}>
      <div className={styles.signUpAndInConteiner}>
        <h2>Welcome to our online store!</h2>
        <p>
          Sign in to your account to start shopping and access exclusive offers. If this is your first time with us,
          register to start shopping with pleasure!
        </p>
        <div className={styles.signUpAndInButtons}>
          <Link to={RoutesName.login}>
            <Button width="200px" height="35px">
              Sign In
            </Button>
          </Link>
          <Link to={RoutesName.registration}>
            <Button width="200px" height="35px">
              Sing Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpAndIn;
