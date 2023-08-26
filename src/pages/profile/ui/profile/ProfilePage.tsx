import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import styles from './ProfilePage.module.scss';

import useScrollToTop from '../../../../shared/helpers/ScrollToTop';
import LayoutProfile from '../../../../widgets/profile';
import getCustomerAction from '../../../../entities/user/model/userActions';

import { useAppDispatch } from '../../../../app/appStore/hooks';

import selectUser from '../../../../entities/user/model/userSelectors';

function ProfilePage(): JSX.Element {
  useScrollToTop();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCustomerAction());
  }, [dispatch]);

  const userData = useSelector(selectUser);

  return (
    <div className={styles.profilePage}>
      <LayoutProfile firstName={userData.firstName} />
    </div>
  );
}

export default ProfilePage;
