import styles from './ProfilePage.module.scss';

import useScrollToTop from '../../../../shared/helpers/ScrollToTop';
import LayoutProfile from '../../../../widgets/profile';

function ProfilePage(): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.profilePage}>
      <LayoutProfile />
    </div>
  );
}

export default ProfilePage;
