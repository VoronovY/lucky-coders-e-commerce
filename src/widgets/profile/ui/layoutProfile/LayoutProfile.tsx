import { useLocation } from 'react-router-dom';

import { useState } from 'react';

import styles from './LayoutProfile.module.scss';

import ProfileMenu from '../profileMenu/ProfileMenu';
import UserProfile from '../../../../entities/user/ui/userProfile/UserProfile';
import UserAddress from '../../../../entities/user/ui/userAddress/UserAddress';
import RoutesName from '../../../../shared/routing';
import ModalForm from '../../../../shared/ui/form/modalForm/ModalForm';

interface LayoutProfileProps {
  firstName?: string | undefined;
}
function LayoutProfile({ firstName }: LayoutProfileProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWelcomeText}>
        <h2>Hello, {firstName}!</h2>
        <span>Welcome to your Account</span>
      </div>
      <div className={styles.profile}>
        <ProfileMenu />
        {location.pathname === RoutesName.profile && <UserProfile onOpenModal={handleOpenModal} />}
        {location.pathname === `${RoutesName.profile}/addresses` && <UserAddress />}
      </div>
      {isModalOpen && (
        <ModalForm title="Change Password" onCloseModal={handleCloseModal}>
          <input type="text" placeholder="New Password" />
        </ModalForm>
      )}
    </div>
  );
}

export default LayoutProfile;
