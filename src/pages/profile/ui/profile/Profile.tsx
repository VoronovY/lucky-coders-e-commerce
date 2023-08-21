import styles from './Profile.module.scss';

import userImg from '../../../../../public/assets/user.png';

function ProfilePage(): JSX.Element {
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
