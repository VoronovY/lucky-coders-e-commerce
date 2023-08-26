import { format } from 'date-fns';

import styles from './LayputProfile.module.scss';

import Button from '../../../../shared/ui/button/Button';
import ProfileMenu from '../profileMenu/ProfileMenu';

interface LayoutProfileProps {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  dateOfBirth?: string | undefined;
}
function LayoutProfile({
  firstName = '',
  lastName = '',
  email = '',
  dateOfBirth = '',
}: LayoutProfileProps): JSX.Element {
  const formattedDateOfBirth = dateOfBirth ? format(new Date(dateOfBirth), 'dd MMMM, yyyy') : '';

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWelcomeText}>
        <h2>Hello, {firstName}!</h2>
        <span>Welcome to your Account</span>
      </div>
      <div className={styles.profile}>
        <ProfileMenu />
        <div className={styles.profileInfo}>
          <div className={styles.profileInfoItem}>
            <span className={styles.profileInfoItemTitle}>Your name</span>
            <span>
              {lastName} {firstName}
            </span>
          </div>
          <div className={styles.profileInfoItem}>
            <span className={styles.profileInfoItemTitle}>Email</span>
            <span>{email}</span>
          </div>
          <div className={styles.profileInfoItem}>
            <span className={styles.profileInfoItemTitle}>Birth Date</span>
            <span>{formattedDateOfBirth}</span>
          </div>
          <button type="button" className={styles.changePasswordButton}>
            Change Password
          </button>
          <Button width="50%">Edit Profile</Button>
        </div>
      </div>
    </div>
  );
}

export default LayoutProfile;
