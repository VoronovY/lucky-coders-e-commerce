import styles from './UserAddress.module.scss';

function UserAddress(): JSX.Element {
  return (
    <div className={styles.profileAddress}>
      <div className={styles.userAdressItem}>
        <div>1234 Main Street</div>
        <div>San Francisco, CA 94111</div>
        <div>(123) 456-7890</div>
        <div>Ys1jS@example.com</div>
      </div>
    </div>
  );
}

export default UserAddress;
