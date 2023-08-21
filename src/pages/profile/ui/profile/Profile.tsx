import styles from './Profile.module.scss';

import userImg from '../../../../../public/assets/user.png';
import useScrollToTop from '../../../../shared/helpers/ScrollToTop';

function ProfilePage(): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.profile}>
      <h2>Your Account</h2>
      <div className={styles.profileImg}>
        <img src={userImg} alt="about" />
      </div>
    </div>
  );
}

export default ProfilePage;
