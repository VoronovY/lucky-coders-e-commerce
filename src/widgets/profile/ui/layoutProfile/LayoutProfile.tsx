import { Outlet } from 'react-router-dom';

import styles from './LayoutProfile.module.scss';

import ProfileMenu from '../profileMenu/ProfileMenu';

interface LayoutProfileProps {
  firstName?: string | undefined;
}
function LayoutProfile({ firstName }: LayoutProfileProps): JSX.Element {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWelcomeText}>
        <h2>Hello, {firstName}!</h2>
        <span>Welcome to your Account</span>
      </div>
      <div className={styles.profile}>
        <ProfileMenu />
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutProfile;
