import { Link } from 'react-router-dom';

import styles from './HeaderProfile.module.scss';

import { AccountIcon, RegisterIcon, LoginIcon } from '../../../../app/layouts/images';

import RoutesName from '../../../../shared/routing';

function HeaderProfile(): JSX.Element {
  const profileArr = [
    { id: 1, url: RoutesName.login, text: 'Sign In', icon: LoginIcon },
    { id: 2, url: RoutesName.registration, text: 'Sign Up', icon: RegisterIcon },
  ];

  return (
    <div className={styles.profileWrapper}>
      <AccountIcon className={styles.profile} />
      <div className={styles.dropDownMenu}>
        <div className={styles.arrow} />
        {profileArr.map((item) => {
          return (
            <Link to={item.url} className={styles.linkWrapper} key={item.id}>
              <item.icon className={styles.img} />
              <p className={styles.text}>{item.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HeaderProfile;
