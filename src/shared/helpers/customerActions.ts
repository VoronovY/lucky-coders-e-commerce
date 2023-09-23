import { ClientResponse, Customer } from '@commercetools/platform-sdk';

import getCustomerAction from '../../entities/user/model/userActions';
import { updateInfoMessage, updateIsModalInfoOpen } from '../model/appSlice';
import { store } from '../../app/appStore/store';

const handleCustomerAction = async (
  action: () => Promise<ClientResponse<Customer>>,
  successMessage: string,
): Promise<void> => {
  const { dispatch } = store;

  return action().then(() => {
    dispatch(getCustomerAction()).then(() => {
      dispatch(updateInfoMessage(successMessage));
      dispatch(updateIsModalInfoOpen(true));
      setTimeout(() => {
        dispatch(updateIsModalInfoOpen(false));
        dispatch(updateInfoMessage(''));
      }, 5000);
    });
  });
};

export default handleCustomerAction;
