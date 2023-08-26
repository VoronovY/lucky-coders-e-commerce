import { useEffect, useState } from 'react';

import styles from './ProfilePage.module.scss';

import useScrollToTop from '../../../../shared/helpers/ScrollToTop';
import LayoutProfile from '../../../../widgets/profile';
import { getCustomerAction, User } from '../../../../entities/user/model/userActions';

function ProfilePage(): JSX.Element {
  useScrollToTop();

  const [userData, setUserData] = useState<User>({
    email: '',
    lastName: '',
    firstName: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    getCustomerAction()
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div className={styles.profilePage}>
      <LayoutProfile
        firstName={userData.firstName}
        lastName={userData.lastName}
        email={userData.email}
        dateOfBirth={userData.dateOfBirth}
      />
    </div>
  );
}

export default ProfilePage;
