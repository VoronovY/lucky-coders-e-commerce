import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './AddressCard.module.scss';

import { Checked, DeleteIcon, EditIcon } from '../../../../../app/layouts/images';
import { updateDefaultBillingAddress, updateDefaultShippingAddress } from '../../../model/userSlice';
import selectUser from '../../../model/userSelectors';
import AddressModal from '../../modal/modaAddress/AddressModal';
import { CountriesOption, ProfileAddressFields } from '../../../../../shared/types/types';

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

  const isDefaultShippingAddress = defaultShippingAddress?.id === id;
  const isDefaultBillingAddress = defaultBillingAddress?.id === id;

  const handleShippingAddressChange = (): void => {
    if (!isDefaultShippingAddress) {
      dispatch(updateDefaultShippingAddress(id));
    } else {
      dispatch(updateDefaultShippingAddress(''));
    }
  };

  const handleBillingAddressChange = (): void => {
    if (!isDefaultBillingAddress) {
      dispatch(updateDefaultBillingAddress(id));
    } else {
      dispatch(updateDefaultBillingAddress(''));
    }
  };

  const onSubmit = (data: ProfileAddressFields): void => {
    console.log(data);
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
      {isModalAddressOpen && (
        <AddressModal
          title="Edit address"
          onCloseAddressModal={handleCloseAddressModal}
          onSubmit={onSubmit}
          country={country}
          city={city}
          state={state === '---' ? '' : state}
          street={street}
          postalCode={postalCode}
        />
      )}
    </div>
  );
}

export default AddressCard;
