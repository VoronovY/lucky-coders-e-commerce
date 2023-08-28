import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import styles from './EditInfo.module.scss';

import Button from '../../../../../shared/ui/button/Button';
import ModalForm from '../../../../../shared/ui/form/modalForm/ModalForm';
import { TextInput } from '../../../../../shared/ui/textInput/TextInput';
import { DateInput } from '../../../../../shared/ui/dateInput/DateInput';
import editInfoSchema from '../../../model/editInfoSchema';

interface EditInfoProps {
  onCloseModalInfo: () => void;
}

interface InfoFields {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
}

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: new Date(),
};
function EditInfo({ onCloseModalInfo }: EditInfoProps): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InfoFields>({
    resolver: yupResolver(editInfoSchema as ObjectSchema<InfoFields>),
    mode: 'onChange',
    defaultValues,
  });
  const onSubmit = (data: InfoFields): InfoFields => {
    return data;
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
        <Button type="button" width="100%" onClick={onCloseModalInfo}>
          Cancel
        </Button>
        <Button type="submit" width="100%">
          Save
        </Button>
      </form>
    </ModalForm>
  );
}

export default EditInfo;
