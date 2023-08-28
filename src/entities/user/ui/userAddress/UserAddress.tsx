import { useSelector } from 'react-redux';

import { useState } from 'react';

import styles from './UserAddress.module.scss';

import AddressCard from './addressCard/AddressCard';

import { PlusIcon } from '../../../../app/layouts/images';
import selectUser from '../../model/userSelectors';
import AddressModal from '../modal/modaAddress/AddressModal';

function UserAddress(): JSX.Element {
  const userData = useSelector(selectUser);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);

  const handleEditClick = (): void => {
    setIsModalAddressOpen(true);
  };

  const handleCloseAddressModal = (): void => {
    setIsModalAddressOpen(false);
  };
  return (
    <div className={styles.profileAddress}>
      {userData.addresses.map((address) => (
        <AddressCard
          key={address.id}
          id={address.id}
          country={address.country}
          city={address.city}
          state={address.state}
          street={address.street}
          postalCode={address.postalCode}
        />
      ))}
      <button type="button" className={styles.addNewAddressItem} onClick={handleEditClick}>
        <div className={styles.addNewAddress}>
          <PlusIcon />
          <span>Add new address</span>
        </div>
      </button>
      {isModalAddressOpen && <AddressModal title="Add new address" onCloseAddAddress={handleCloseAddressModal} />}
    </div>
  );
}

export default UserAddress;
