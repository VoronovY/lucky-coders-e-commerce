import { format } from 'date-fns';

import { useSelector } from 'react-redux';

import { useState } from 'react';

import styles from './UserProfile.module.scss';

import selectUser from '../../model/userSelectors';
import Button from '../../../../shared/ui/button/Button';
import ChangePasswordModal from '../modal/modalPassword/ChangePasswordModal';
import EditInfo from '../modal/modalProfile/EditInfo';

function UserProfile(): JSX.Element {
  const userData = useSelector(selectUser);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);

  const handleOpenModalPassword = (): void => {
    setIsPasswordModalOpen(true);
  };

  const handleCloseModalPassword = (): void => {
    setIsPasswordModalOpen(false);
  };

  const handleOpenModalInfo = (): void => {
    setIsModalInfoOpen(true);
  };

  const handleCloseModalInfo = (): void => {
    setIsModalInfoOpen(false);
  };

  const formattedDateOfBirth = userData.dateOfBirth ? format(new Date(userData.dateOfBirth), 'dd MMMM, yyyy') : '';

  const profileInfoItems = [
    { id: '1', title: 'Your name', value: `${userData.lastName} ${userData.firstName}` },
    { id: '2', title: 'Email', value: userData.email },
    { id: '3', title: 'Birth Date', value: formattedDateOfBirth },
  ];

  return (
    <>
      <div className={styles.profileInfo}>
        {profileInfoItems.map((item) => (
          <div className={styles.profileInfoItem} key={item.id}>
            <span className={styles.profileInfoItemTitle}>{item.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
        <div className={styles.buttonsWrapper}>
          <Button width="100%" height="46px" onClick={handleOpenModalInfo}>
            Edit Profile
          </Button>
          <Button width="100%" height="46px" className={styles.changePasswordButton} onClick={handleOpenModalPassword}>
            Change Password
          </Button>
        </div>
      </div>
      {isPasswordModalOpen && <ChangePasswordModal onCloseModalPassword={handleCloseModalPassword} />}
      {isModalInfoOpen && (
        <EditInfo
          onCloseModalInfo={handleCloseModalInfo}
          firstName={userData.firstName}
          lastName={userData.lastName}
          email={userData.email}
          birthDate={new Date(userData.dateOfBirth)}
        />
      )}
    </>
  );
}

export default UserProfile;
