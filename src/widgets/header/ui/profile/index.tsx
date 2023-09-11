import { Link, useNavigate } from 'react-router-dom';

import styles from './HeaderProfile.module.scss';

import { AccountIcon, RegisterIcon, LoginIcon, LogoutIcon } from '../../../../app/layouts/images';

import RoutesName from '../../../../shared/routing';
import { getAccessToken, getUserId } from '../../../../shared/selectors/mainSettingsSelectors';
import { useAppDispatch, useAppSelector } from '../../../../app/appStore/hooks';
import { updateAccessToken, updateUserId } from '../../../../shared/model/appSlice';
import myTokenCache from '../../../../shared/api/auth/tokenCache';
import { updateCart } from '../../../../entities/cart/model/cartSlice';

function HeaderProfile(): JSX.Element {
  const navigate = useNavigate();
  const userId = useAppSelector(getUserId);
  const token = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  const profileArr = [
    { id: 1, url: RoutesName.login, text: 'Sign In', icon: LoginIcon },
    { id: 2, url: RoutesName.registration, text: 'Sign Up', icon: RegisterIcon },
  ];
  const handleSignOut = (): void => {
    localStorage.removeItem('accessToken');
    myTokenCache.clear();
    dispatch(updateUserId(''));
    dispatch(updateAccessToken(''));
    dispatch(updateCart(null));
    navigate(RoutesName.main);
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
      <>
        <Link to={RoutesName.profile} className={styles.linkWrapper} key="temporaryKey">
          <AccountIcon className={styles.img} />
          <p className={styles.text}>Profile</p>
        </Link>
        <button className={styles.linkWrapper} key="temporaryKey2" type="button" onClick={handleSignOut}>
          <LogoutIcon className={styles.img} />
          <p className={styles.text}>Sign Out</p>
        </button>
      </>
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
