import { format } from 'date-fns';

import { useSelector } from 'react-redux';

import styles from './UserProfile.module.scss';

import selectUser from '../../model/userSelectors';
import Button from '../../../../shared/ui/button/Button';

interface UserProfileProps {
  onOpenModal: () => void;
}
function UserProfile({ onOpenModal }: UserProfileProps): JSX.Element {
  const userData = useSelector(selectUser);

  const formattedDateOfBirth = userData.dateOfBirth ? format(new Date(userData.dateOfBirth), 'dd MMMM, yyyy') : '';

  const profileInfoItems = [
    { id: '1', title: 'Your name', value: `${userData.lastName} ${userData.firstName}` },
    { id: '2', title: 'Email', value: userData.email },
    { id: '3', title: 'Birth Date', value: formattedDateOfBirth },
  ];

  return (
    <div className={styles.profileInfo}>
      {profileInfoItems.map((item) => (
        <div className={styles.profileInfoItem} key={item.id}>
          <span className={styles.profileInfoItemTitle}>{item.title}</span>
          <span>{item.value}</span>
        </div>
      ))}
      <button type="button" className={styles.changePasswordButton} onClick={onOpenModal}>
        Change Password
      </button>
      <Button width="70%">Edit Profile</Button>
    </div>
  );
}

export default UserProfile;
