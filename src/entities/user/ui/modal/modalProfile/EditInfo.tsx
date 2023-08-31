import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { format } from 'date-fns';
import { useState } from 'react';

import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import styles from './EditInfo.module.scss';

import Button from '../../../../../shared/ui/button/Button';
import ModalForm from '../../../../../shared/ui/form/modalForm/ModalForm';
import { TextInput } from '../../../../../shared/ui/textInput/TextInput';
import { DateInput } from '../../../../../shared/ui/dateInput/DateInput';
import editInfoSchema from '../../../model/editInfoSchema';
import { InfoFields } from '../../../../../shared/types/types';
import ButtonCancel from '../buttonCancel/ButtonCancel';
import { getErrorSignUpMessage } from '../../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../../shared/ui/modalError/ModalError';
import SuccessfulMessages from '../../../../../shared/successfulMessages';
import { executeCustomerAction } from '../../../api/userApi';
import handleCustomerAction from '../../../../../shared/helpers/customerActions';

interface EditInfoProps extends InfoFields {
  onCloseModalInfo: () => void;
  version: number;
}
function EditInfo({ onCloseModalInfo, firstName, lastName, email, birthDate, version }: EditInfoProps): JSX.Element {
  const defaultValues = {
    firstName,
    lastName,
    email,
    birthDate,
    version,
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InfoFields>({
    resolver: yupResolver(editInfoSchema as ObjectSchema<InfoFields>),
    mode: 'onChange',
    defaultValues,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const disableSubmit = Object.values(errors).length > 0;
  const onSubmit = (data: InfoFields): void => {
    setErrorMessage('');
    const formattedBirthDate = format(data.birthDate, 'yyyy-MM-dd');

    const actions: MyCustomerUpdateAction[] = [
      { action: 'setFirstName', firstName: data.firstName },
      { action: 'setLastName', lastName: data.lastName },
      { action: 'changeEmail', email: data.email },
      { action: 'setDateOfBirth', dateOfBirth: formattedBirthDate },
    ];

    handleCustomerAction(() => executeCustomerAction(version, actions), SuccessfulMessages.updateInfo)
      .then(() => {
        onCloseModalInfo();
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  return (
    <ModalForm title="Update information">
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <form className={styles.changeInfo} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }): JSX.Element => {
            return (
              <TextInput id="1" placeholder="First name" label="First name *" error={errors.firstName} {...field} />
            );
          }}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }): JSX.Element => {
            return <TextInput id="2" placeholder="Last name" label="Last name *" error={errors.lastName} {...field} />;
          }}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }): JSX.Element => {
            return <TextInput id="3" placeholder="Email" label="Email *" {...field} error={errors.email} />;
          }}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field: { onChange, value } }): JSX.Element => {
            return <DateInput id="4" title="Birth date *" onChange={onChange} value={value} error={errors.birthDate} />;
          }}
        />
        <Button type="submit" height="46px" width="100%" disabled={disableSubmit}>
          Save
        </Button>
        <ButtonCancel onClick={onCloseModalInfo} />
      </form>
    </ModalForm>
  );
}

export default EditInfo;
