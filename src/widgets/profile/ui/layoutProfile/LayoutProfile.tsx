import { useLocation } from 'react-router-dom';

import styles from './LayoutProfile.module.scss';

import ProfileMenu from '../profileMenu/ProfileMenu';
import UserProfile from '../../../../entities/user/ui/userProfile/UserProfile';
import UserAddress from '../../../../entities/user/ui/userAddress/UserAddress';
import RoutesName from '../../../../shared/routing';

interface LayoutProfileProps {
  firstName?: string | undefined;
}
function LayoutProfile({ firstName }: LayoutProfileProps): JSX.Element {
  const location = useLocation();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWelcomeText}>
        <h2>Hello, {firstName}!</h2>
        <span>Welcome to your Account</span>
      </div>
      <div className={styles.profile}>
        <ProfileMenu />
        {location.pathname === RoutesName.profile && <UserProfile />}
        {location.pathname === `${RoutesName.profile}/addresses` && <UserAddress />}
      </div>
    </div>
  );
}

export default LayoutProfile;
