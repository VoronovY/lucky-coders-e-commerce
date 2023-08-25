import { useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './LayputProfile.module.scss';

import { CategoriesArrowIcon } from '../../../../app/layouts/images';
import Button from '../../../../shared/ui/button/Button';
import RoutesName from '../../../../shared/routing';

function LayoutProfile(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWelcomeText}>
        <h2>Hello, Ivan!</h2>
        <span>Welcome to your Account</span>
      </div>
      <div className={styles.profile}>
        <div className={styles.profileMenu}>
          <ul className={styles.profileList}>
            <li className={`${styles.link} ${styles.linkActive}`}>
              <Link to={RoutesName.profile}>Profile</Link>
            </li>
            <li>
              <button type="button" className={`${styles.addressBookButton} ${styles.link}`} onClick={handleToggle}>
                <span>Address book</span>
                <CategoriesArrowIcon className={styles.arrowIcon} />
              </button>
              {isExpanded && (
                <ul>
                  <li className={styles.link}>
                    <Link to={`${RoutesName.profile}/billing-address`}>Billing address</Link>
                  </li>
                  <li className={styles.link}>
                    <Link to={`${RoutesName.profile}/shipping-address`}>Shipping address</Link>
                  </li>
                </ul>
              )}
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
