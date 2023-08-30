import { ClientResponse, Customer } from '@commercetools/platform-sdk';

import { store } from '../../app/appStore/appStore';
import getCustomerAction from '../../entities/user/model/userActions';
import { updateInfoMessage, updateIsModalInfoOpen } from '../model/appSlice';

const handleCustomerAction = async (
  action: () => Promise<ClientResponse<Customer>>,
  successMessage: string,
): Promise<void> => {
  const { dispatch } = store;

  return action().then(() => {
    store.dispatch(getCustomerAction()).then((result) => {
      dispatch(result);
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
