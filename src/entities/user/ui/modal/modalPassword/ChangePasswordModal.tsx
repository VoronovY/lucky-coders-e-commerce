import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import styles from './ChangePasswordModal.module.scss';

import ModalForm from '../../../../../shared/ui/form/modalForm/ModalForm';

import { PasswordInput } from '../../../../../shared/ui/passwordInput/PasswordInput';

import Button from '../../../../../shared/ui/button/Button';
import changePasswordSchema from '../../../model/changePasswordSchema';

interface AddressCardProps {
  onCloseModalPassword: () => void;
}

interface PasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initLoginForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

function ChangePasswordModal({ onCloseModalPassword }: AddressCardProps): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordFields>({
    resolver: yupResolver(changePasswordSchema as ObjectSchema<PasswordFields>),
    mode: 'onChange',
    defaultValues: initLoginForm,
  });
  const onSubmit = (data: PasswordFields): PasswordFields => {
    return data;
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
                {...field}
                error={errors.currentPassword}
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
                placeholder="Password"
                label="New password *"
                {...field}
                error={errors.newPassword}
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
                {...field}
                error={errors.confirmPassword}
              />
            );
          }}
        />
        <Button type="button" width="100%" onClick={onCloseModalPassword}>
          Cancel
        </Button>
        <Button type="submit" width="100%">
          Save
        </Button>
      </form>
    </ModalForm>
  );
}

export default ChangePasswordModal;
