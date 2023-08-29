import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { ChangeEvent } from 'react';

import styles from './ChangePasswordModal.module.scss';

import ModalForm from '../../../../../shared/ui/form/modalForm/ModalForm';

import { PasswordInput } from '../../../../../shared/ui/passwordInput/PasswordInput';

import Button from '../../../../../shared/ui/button/Button';
import changePasswordSchema from '../../../model/changePasswordSchema';
import { PasswordFields } from '../../../../../shared/types/types';

interface ChangePasswordModalProps {
  onCloseModalPassword: () => void;
}

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

function ChangePasswordModal({ onCloseModalPassword }: ChangePasswordModalProps): JSX.Element {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<PasswordFields>({
    resolver: yupResolver(changePasswordSchema as ObjectSchema<PasswordFields>),
    mode: 'onChange',
    defaultValues,
  });

  const disableSubmit = Object.values(errors).length > 0;
  const onSubmit = (data: PasswordFields): PasswordFields => {
    return data;
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    const confirmPassword = getValues('confirmPassword');

    changePasswordSchema
      .validateAt('confirmPassword', { newPassword, confirmPassword })
      .then(() => {
        clearErrors('confirmPassword');
      })
      .catch((error) => {
        setError('confirmPassword', {
          type: 'validate',
          message: error.message,
        });
      });
  };

  return (
    <ModalForm title="Change password">
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
        <Button type="submit" width="100%" disabled={disableSubmit}>
          Save
        </Button>
        <Button type="button" width="100%" onClick={onCloseModalPassword}>
          Cancel
        </Button>
      </form>
    </ModalForm>
  );
}

export default ChangePasswordModal;
