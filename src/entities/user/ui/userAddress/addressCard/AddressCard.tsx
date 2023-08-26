import { useState } from 'react';

import styles from './AddressCard.module.scss';

import { Checked, DeleteIcon, EditIcon } from '../../../../../app/layouts/images';
import { UserDefaultAddress } from '../../../../../shared/types/types';

interface AddressCardProps {
  id: string;
  country: string;
  city: string;
  state: string;
  street: string;
  postalCode: string;
  shippingAddress?: UserDefaultAddress;
  billingAddress?: UserDefaultAddress;
}
function AddressCard({
  id,
  country,
  city,
  state,
  street,
  postalCode,
  shippingAddress,
  billingAddress,
}: AddressCardProps): JSX.Element {
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(
    shippingAddress && shippingAddress.id.toString() === id.toString(),
  );
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(
    billingAddress && billingAddress.id.toString() === id.toString(),
  );

  const handleShippingAddressChange = (): void => {
    setIsDefaultShippingAddress(!isDefaultShippingAddress);
  };

  const handleBillingAddressChange = (): void => {
    setIsDefaultBillingAddress(!isDefaultBillingAddress);
  };

  return (
    <div className={styles.userAddressItem}>
      <div className={styles.userAddressContainer}>
        <div>
          <span>Country: </span>
          {country}
        </div>
        <div>
          <span>City: </span>
          {city}
        </div>
        <div>
          <span>State: </span>
          {state}
        </div>
        <div>
          <span>Street: </span>
          {street}
        </div>
        <div>
          <span>Postal Code: </span>
          {postalCode}
        </div>
      </div>
      <div className={styles.addressActions}>
        <div className={styles.actionsIcons}>
          <EditIcon />
          <DeleteIcon />
        </div>
        <div className={styles.actionsDefault}>
          <div>
            <span>default shipping address</span>
            <span>default billing address</span>
          </div>
          <div>
            <label htmlFor={`shipping-${postalCode}`} className={styles.label}>
              <input
                className={styles.input}
                id={`shipping-${postalCode}`}
                type="checkbox"
                checked={isDefaultShippingAddress}
                onChange={handleShippingAddressChange}
              />
              <span className={styles.box}>
                <Checked className={styles.checkImg} />
              </span>
            </label>
            <label htmlFor={`billing-${postalCode}`} className={styles.label}>
              <input
                className={styles.input}
                id={`billing-${postalCode}`}
                type="checkbox"
                checked={isDefaultBillingAddress}
                onChange={handleBillingAddressChange}
              />
              <span className={styles.box}>
                <Checked className={styles.checkImg} />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
