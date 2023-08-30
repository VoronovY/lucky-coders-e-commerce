import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import styles from './UserAddress.module.scss';

import AddressCard from './addressCard/AddressCard';

import { PlusIcon } from '../../../../app/layouts/images';
import selectUser from '../../model/userSelectors';
import AddressModal from '../modal/modaAddress/AddressModal';
import { ProfileAddressFields } from '../../../../shared/types/types';
import addNewAddress from '../../api/addNewAddress';
import { store } from '../../../../app/appStore/appStore';
import getCustomerAction from '../../model/userActions';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import { updateInfoMessage, updateIsModalInfoOpen } from '../../../../shared/model/appSlice';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import SuccessfulMessages from '../../../../shared/successfulMessages';

function UserAddress(): JSX.Element {
  const userData = useSelector(selectUser);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleEditClick = (): void => {
    setIsModalAddressOpen(true);
  };

  const handleCloseAddressModal = (): void => {
    setIsModalAddressOpen(false);
  };

  const onSubmit = (data: ProfileAddressFields): void => {
    setErrorMessage('');

    const newAddress = {
      version: userData.version,
      country: data.country?.iso || '',
      city: data.city,
      streetName: data.street,
      state: data.state,
      postalCode: data.postalCode,
    };

    addNewAddress(newAddress)
      .then(() => {
        store.dispatch(getCustomerAction()).then((result) => {
          dispatch(result);
          handleCloseAddressModal();
          dispatch(updateInfoMessage(SuccessfulMessages.newAddress));
          dispatch(updateIsModalInfoOpen(true));
          setTimeout(() => {
            dispatch(updateIsModalInfoOpen(false));
            dispatch(updateInfoMessage(''));
          }, 5000);
        });
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  return (
    <div className={styles.profileAddress}>
      {errorMessage && <ModalError errorMessage={errorMessage} />}
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
      {isModalAddressOpen && (
        <AddressModal
          title="Add new address"
          onCloseAddressModal={handleCloseAddressModal}
          onSubmit={onSubmit}
          country={null}
          city=""
          state=""
          street=""
          postalCode=""
        />
      )}
    </div>
  );
}

export default UserAddress;
