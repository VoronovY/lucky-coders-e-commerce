import { useEffect } from 'react';

import styles from './LayoutHeader.module.scss';

import Logo from '../../../../shared/ui/logo/Logo';
import HeaderProfile from '../profile';
import HeaderCart from '../cart';
import HeaderNav from '../nav';

import { useAppDispatch, useAppSelector } from '../../../../app/appStore/hooks';
import { updateAccessToken, updateInfoMessage, updateIsModalInfoOpen } from '../../../../shared/model/appSlice';
import { ModalInfo } from '../../../../shared/ui';
import { getInfoModalMessage, getIsInfoModalOpen } from '../../../../shared/selectors/mainSettingsSelectors';

function LayoutHeader(): JSX.Element {
  const dispatch = useAppDispatch();

  const infoMessage = useAppSelector(getInfoModalMessage);
  const isModalInfoOpen = useAppSelector(getIsInfoModalOpen);

  const handleModalClick = (): void => {
    dispatch(updateIsModalInfoOpen(false));
    dispatch(updateInfoMessage(''));
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(updateAccessToken(token));
    }
  }, [dispatch]);
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <HeaderNav />
        <div className={styles.imgs}>
          <HeaderProfile />
          <HeaderCart />
        </div>
      </div>
      <ModalInfo message={infoMessage} isOpen={isModalInfoOpen} handleClick={handleModalClick} />
    </header>
  );
}

export default LayoutHeader;
