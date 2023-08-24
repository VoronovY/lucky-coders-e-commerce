import styles from './LayputProfile.module.scss';

import { CategoriesArrowIcon } from '../../../../app/layouts/images';

function LayoutProfile(): JSX.Element {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileMenu}>
        <div className={styles.profileWelcomeText}>
          <h2>Hello, Ivan!</h2>
          <span>Welcome to your Account</span>
        </div>
        <ul className={styles.profileList}>
          <li>Personal info</li>
          <li>
            <div className={styles.addressBookTitle}>
              <span>Address book</span>
              <CategoriesArrowIcon className={styles.arrowIcon} />
            </div>
            <ul>
              <li>Billing address</li>
              <li>Shipping address</li>
            </ul>
          </li>
          <li>Sign Out</li>
        </ul>
      </div>
      <div>
        <div>Your Name</div>
      </div>
    </div>
  );
}

export default LayoutProfile;
