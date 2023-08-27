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
  const addressDetails = [
    { id: 1, title: 'Country', value: country },
    { id: 2, title: 'City', value: city },
    { id: 3, title: 'State', value: state },
    { id: 4, title: 'Street', value: street },
    { id: 5, title: 'Postal Code', value: postalCode },
  ];

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
        {addressDetails.map((detail) => (
          <div key={detail.id}>
            <span>{detail.title}: </span>
            {detail.value}
          </div>
        ))}
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
            <label htmlFor={`shipping-${id}`} className={styles.label}>
              <input
                className={styles.input}
                id={`shipping-${id}`}
                type="checkbox"
                checked={isDefaultShippingAddress}
                onChange={handleShippingAddressChange}
              />
              <span className={styles.box}>
                <Checked className={styles.checkImg} />
              </span>
            </label>
            <label htmlFor={`billing-${id}`} className={styles.label}>
              <input
                className={styles.input}
                id={`billing-${id}`}
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
