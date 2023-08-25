import styles from './LayputProfile.module.scss';

import { CategoriesArrowIcon } from '../../../../app/layouts/images';
import Button from '../../../../shared/ui/button/Button';

function LayoutProfile(): JSX.Element {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWelcomeText}>
        <h2>Hello, Ivan!</h2>
        <span>Welcome to your Account</span>
      </div>
      <div className={styles.profile}>
        <div className={styles.profileMenu}>
          <ul className={styles.profileList}>
            <li className={`${styles.link}, ${styles.menuActive}`}>Profile</li>
            <li>
              <div className={`${styles.addressBookTitle} ${styles.link}`}>
                <span>Address book</span>
                <CategoriesArrowIcon className={styles.arrowIcon} />
              </div>
              <ul>
                <li className={styles.link}>Billing address</li>
                <li className={styles.link}>Shipping address</li>
              </ul>
            </li>
            <li className={styles.link}>Sign Out</li>
          </ul>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileInfoItem}>
            <span className={styles.profileInfoItemTitle}>Your name</span>
            <span>Ivanov Ivan</span>
          </div>
          <div className={styles.profileInfoItem}>
            <span className={styles.profileInfoItemTitle}>Email</span>
            <span>ivanov@gmail.com</span>
          </div>
          <div className={styles.profileInfoItem}>
            <span className={styles.profileInfoItemTitle}>Birth Date</span>
            <span>5 june, 1990</span>
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
