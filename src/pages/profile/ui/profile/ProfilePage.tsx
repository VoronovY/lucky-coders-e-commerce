import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import styles from './ProfilePage.module.scss';

import useScrollToTop from '../../../../shared/helpers/ScrollToTop';
import LayoutProfile from '../../../../widgets/profile';
import getCustomerAction from '../../../../entities/user/model/userActions';

import { useAppDispatch } from '../../../../app/appStore/hooks';

import selectUser from '../../../../entities/user/model/userSelectors';
import RoutesName from '../../../../shared/routing';

function ProfilePage(): JSX.Element {
  useScrollToTop();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUser);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate(RoutesName.login, { replace: true });
    } else {
      dispatch(getCustomerAction());
    }
  }, [dispatch, navigate]);

  return (
    <div className={styles.profilePage}>
      <LayoutProfile firstName={userData.firstName} />
    </div>
  );
}

export default ProfilePage;
