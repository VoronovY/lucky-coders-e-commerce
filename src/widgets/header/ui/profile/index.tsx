import { Link } from 'react-router-dom';

import styles from './HeaderProfile.module.scss';

import { AccountIcon, RegisterIcon, LoginIcon } from '../../../../app/layouts/images';

import RoutesName from '../../../../shared/routing';

function HeaderNavProfile(): JSX.Element {
  return (
    <div className={styles.profileWrapper}>
      <AccountIcon className={styles.profile} />
      <div className={styles.dropDownMenu}>
        <div className={styles.arrow} />
        <Link to={RoutesName.login} className={styles.linkWrapper}>
          <LoginIcon className={styles.img} />
          <p className={styles.text}> Sign In</p>
        </Link>
        <Link to={RoutesName.registration} className={styles.linkWrapper}>
          <RegisterIcon className={styles.img} />
          <p className={styles.text}>Sign Up</p>
        </Link>
      </div>
    </div>
  );
}

export default HeaderNavProfile;
