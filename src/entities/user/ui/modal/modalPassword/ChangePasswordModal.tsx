import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './ChangePasswordModal.module.scss';

import ModalForm from '../../../../../shared/ui/form/modalForm/ModalForm';

import { PasswordInput } from '../../../../../shared/ui/passwordInput/PasswordInput';

import Button from '../../../../../shared/ui/button/Button';
import changePasswordSchema from '../../../model/changePasswordSchema';
import { PasswordFields } from '../../../../../shared/types/types';
import ButtonCancel from '../buttonCancel/ButtonCancel';

import selectUser from '../../../model/userSelectors';
import { loginUser } from '../../../../../shared/api/auth/loginUser';
import {
  updateAccessToken,
  updateInfoMessage,
  updateIsModalInfoOpen,
  updateUserId,
} from '../../../../../shared/model/appSlice';
import myTokenCache from '../../../../../shared/api/auth/tokenCache';
import { getErrorSignUpMessage } from '../../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../../shared/ui/modalError/ModalError';
import { store } from '../../../../../app/appStore/appStore';
import getCustomerAction from '../../../model/userActions';
import SuccessfulMessages from '../../../../../shared/successfulMessages';
import { changePassword } from '../../../api/userApi';

interface ChangePasswordModalProps {
  onCloseModalPassword: () => void;
  version: number;
}

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

function ChangePasswordModal({ version, onCloseModalPassword }: ChangePasswordModalProps): JSX.Element {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<PasswordFields>({
    resolver: yupResolver(changePasswordSchema as ObjectSchema<PasswordFields>),
    mode: 'onChange',
    defaultValues,
  });

  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const disableSubmit = Object.values(errors).length > 0;

  const onSubmit = (data: PasswordFields): void => {
    setErrorMessage('');

    changePassword(version, data.currentPassword, data.newPassword)
      .then(() => {
        onCloseModalPassword();
        myTokenCache.clear();
        loginUser(userData.email, data.newPassword)
          .then((response) => {
            dispatch(updateAccessToken(myTokenCache.store.token));
            dispatch(updateUserId(response.body.customer.id));
            localStorage.setItem('accessToken', myTokenCache.store.token);
            dispatch(updateInfoMessage(SuccessfulMessages.updatePassword));
            dispatch(updateIsModalInfoOpen(true));
            setTimeout(() => {
              dispatch(updateIsModalInfoOpen(false));
              dispatch(updateInfoMessage(''));
            }, 5000);
          })
          .then(() => {
            store.dispatch(getCustomerAction());
          });
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPasswordValue = e.target.value;
    const confirmPasswordValue = getValues('confirmPassword');

    changePasswordSchema
      .validateAt('confirmPassword', { newPasswordValue, confirmPasswordValue })
      .then(() => {
        clearErrors('confirmPassword');
      })
      .catch((error) => {
        setError('confirmPassword', {
          type: 'validate',
          message: error.message,
        });
      })
      .finally(() => {
        trigger('confirmPassword');
      });
  };

  return (
    <ModalForm title="Change password">
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <form className={styles.changePasswordForm} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="currentPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <PasswordInput
                id="1"
                placeholder="Password"
                label="Current Password *"
                error={errors.currentPassword}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="newPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <PasswordInput
                id="2"
                name="newPassword"
                placeholder="Password"
                label="New password *"
                error={errors.newPassword}
                onChange={(e): void => {
                  field.onChange(e);
                  handleNewPasswordChange(e);
                }}
              />
            );
          }}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <PasswordInput
                id="3"
                placeholder="Password"
                label="Confirm new password *"
                error={errors.confirmPassword}
                {...field}
              />
            );
          }}
        />
        <Button type="submit" width="100%" height="46px" disabled={disableSubmit}>
          Save
        </Button>
        <ButtonCancel onClick={onCloseModalPassword} name="Cancel" />
      </form>
    </ModalForm>
  );
}

export default ChangePasswordModal;
