import { Link } from 'react-router-dom';

import styles from './HeaderProfile.module.scss';

import { AccountIcon, RegisterIcon, LoginIcon } from '../../../../app/layouts/images';

import RoutesName from '../../../../shared/routing';
import { getAccessToken, getUserId } from '../../../../shared/selectors/mainSettingsSelectors';
import { useAppDispatch, useAppSelector } from '../../../../app/appStore/hooks';
import { updateAccessToken, updateUserId } from '../../../../shared/model/appSlice';

function HeaderProfile(): JSX.Element {
  const userId = useAppSelector(getUserId);
  const token = useAppSelector(getAccessToken);
  const disaptch = useAppDispatch();

  const profileArr = [
    { id: 1, url: RoutesName.login, text: 'Sign In', icon: LoginIcon },
    { id: 2, url: RoutesName.registration, text: 'Sign Up', icon: RegisterIcon },
  ];
  const handleSignOut = (): void => {
    localStorage.removeItem('accessToken');
    disaptch(updateUserId(''));
    disaptch(updateAccessToken(''));
  };

  const layout =
    !userId && !token ? (
      profileArr.map((item) => {
        return (
          <Link to={item.url} className={styles.linkWrapper} key={item.id}>
            <item.icon className={styles.img} />
            <p className={styles.text}>{item.text}</p>
          </Link>
        );
      })
    ) : (
      <div>
        <Link to={RoutesName.profile} className={styles.linkWrapper} key="temporaryKey">
          <p className={styles.text}>Profile</p>
        </Link>
        <button className={styles.linkWrapper} key="temporaryKey2" type="button" onClick={handleSignOut}>
          <p className={styles.text}>Sign Out</p>
        </button>
      </div>
    );

  return (
    <div className={styles.profileWrapper}>
      <AccountIcon className={styles.profile} />
      <div className={styles.dropDownMenu}>
        <div className={styles.arrow} />
        {layout}
      </div>
    </div>
  );
}

export default HeaderProfile;
