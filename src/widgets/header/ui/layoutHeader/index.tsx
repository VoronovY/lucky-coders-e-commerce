import { useEffect } from 'react';

import styles from './LayoutHeader.module.scss';

import Logo from '../../../../shared/ui/logo/Logo';
import HeaderProfile from '../profile';
import HeaderCart from '../cart';
import HeaderNav from '../nav';

import { useAppDispatch } from '../../../../app/appStore/hooks';
import { updateAccessToken } from '../../../../shared/model/appSlice';

function LayoutHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(updateAccessToken(token));
    }
  }, [dispatch]);
  return (
    <header className={styles.header}>
      <Logo />
      <HeaderNav />
      <div className={styles.imgs}>
        <HeaderProfile />
        <HeaderCart />
      </div>
    </header>
  );
}

export default LayoutHeader;
