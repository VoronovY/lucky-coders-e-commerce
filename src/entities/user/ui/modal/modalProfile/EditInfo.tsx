import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import { format } from 'date-fns';

import { useDispatch } from 'react-redux';

import styles from './EditInfo.module.scss';

import Button from '../../../../../shared/ui/button/Button';
import ModalForm from '../../../../../shared/ui/form/modalForm/ModalForm';
import { TextInput } from '../../../../../shared/ui/textInput/TextInput';
import { DateInput } from '../../../../../shared/ui/dateInput/DateInput';
import editInfoSchema from '../../../model/editInfoSchema';
import { InfoFields } from '../../../../../shared/types/types';
import ButtonCancel from '../buttonCancel/ButtonCancel';
import updateUserInfo from '../../../api/updateUserInfo';
import getCustomerAction from '../../../model/userActions';
import { store } from '../../../../../app/appStore/appStore';

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
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InfoFields>({
    resolver: yupResolver(editInfoSchema as ObjectSchema<InfoFields>),
    mode: 'onChange',
    defaultValues,
  });

  const disableSubmit = Object.values(errors).length > 0;
  const onSubmit = (data: InfoFields): void => {
    const formattedBirthDate = format(data.birthDate, 'yyyy-MM-dd');

    updateUserInfo(data.firstName, data.lastName, data.email, formattedBirthDate, version).then(() => {
      store.dispatch(getCustomerAction()).then((result) => {
        dispatch(result);
        onCloseModalInfo();
      });
    });
  };

  return (
    <ModalForm title="Update information">
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
