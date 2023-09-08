import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUser } from './loginUser';

import myTokenCache from './tokenCache';

import { updateAccessToken, updateInfoMessage, updateIsModalInfoOpen, updateUserId } from '../../model/appSlice';
import SuccessfulMessages from '../../successfulMessages';
import RoutesName from '../../routing';

const useCreateUserAndNavigate = (): ((email: string, password: string) => Promise<void>) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUserAndNavigate = async (email: string, password: string): Promise<void> => {
    const res = await createUser(email, password);
    dispatch(updateUserId(res.body.id));
    dispatch(updateAccessToken(myTokenCache.store.token));
    dispatch(updateInfoMessage(SuccessfulMessages.signIn));
    dispatch(updateIsModalInfoOpen(true));
    setTimeout(() => {
      dispatch(updateIsModalInfoOpen(false));
      dispatch(updateInfoMessage(''));
    }, 5000);
    localStorage.setItem('accessToken', myTokenCache.store.token);
    navigate(RoutesName.main);
  };

  return createUserAndNavigate;
};

export default useCreateUserAndNavigate;
