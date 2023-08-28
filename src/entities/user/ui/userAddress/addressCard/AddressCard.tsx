import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './AddressCard.module.scss';

import { Checked, DeleteIcon, EditIcon } from '../../../../../app/layouts/images';
import { updateDefaultBillingAddress, updateDefaultShippingAddress } from '../../../model/userSlice';
import selectUser from '../../../model/userSelectors';
import AddressModal from '../../modal/modaAddress/AddressModal';
import { CountriesOption } from '../../../../../shared/types/types';

interface AddressCardProps {
  id: string;
  country: CountriesOption | null;
  city: string;
  state: string;
  street: string;
  postalCode: string;
}

function AddressCard({ id, country, city, state, street, postalCode }: AddressCardProps): JSX.Element {
  const addressDetails = [
    { id: 1, title: 'Country', value: country?.label },
    { id: 2, title: 'City', value: city },
    { id: 3, title: 'State', value: state },
    { id: 4, title: 'Street', value: street },
    { id: 5, title: 'Postal Code', value: postalCode },
  ];
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);

  const handleEditClick = (): void => {
    setIsModalAddressOpen(true);
  };

  const handleCloseAddressModal = (): void => {
    setIsModalAddressOpen(false);
  };

  const { defaultShippingAddress, defaultBillingAddress } = userData;

  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(
    defaultShippingAddress && defaultShippingAddress.id.toString() === id.toString(),
  );
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(
    defaultBillingAddress && defaultBillingAddress.id.toString() === id.toString(),
  );

  useEffect(() => {
    setIsDefaultShippingAddress(defaultShippingAddress && defaultShippingAddress.id.toString() === id.toString());
    setIsDefaultBillingAddress(defaultBillingAddress && defaultBillingAddress.id.toString() === id.toString());
  }, [defaultShippingAddress, defaultBillingAddress, id]);

  const handleShippingAddressChange = (): void => {
    setIsDefaultShippingAddress(!isDefaultShippingAddress);
    if (!isDefaultShippingAddress) {
      dispatch(updateDefaultShippingAddress(id));
    } else {
      dispatch(updateDefaultShippingAddress(''));
    }
  };

  const handleBillingAddressChange = (): void => {
    setIsDefaultBillingAddress(!isDefaultBillingAddress);
    if (!isDefaultBillingAddress) {
      dispatch(updateDefaultBillingAddress(id));
    } else {
      dispatch(updateDefaultBillingAddress(''));
    }
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
          <EditIcon onClick={handleEditClick} />
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
                checked={defaultShippingAddress?.id === id}
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
                checked={defaultBillingAddress?.id === id}
                onChange={handleBillingAddressChange}
              />
              <span className={styles.box}>
                <Checked className={styles.checkImg} />
              </span>
            </label>
          </div>
        </div>
      </div>
      {isModalAddressOpen && (
        <AddressModal
          title="Edit address"
          onCloseAddAddress={handleCloseAddressModal}
          country={country}
          city={city}
          state={state}
          street={street}
          postalCode={postalCode}
        />
      )}
    </div>
  );
}

export default AddressCard;
