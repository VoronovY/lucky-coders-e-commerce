import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import RoutesName from '../../../../shared/routing';

import { TextInput, PasswordInput, SelectInput, DateInput } from '../../../../shared/ui';
import { OptionInput } from '../../../../shared/ui/select/SelectInput';

import { FormText, FormWrapper } from '../../../../shared/ui/form';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

interface RegisterUserFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  country: OptionInput;
  city: string;
  street: string;
  postal: string;
}

function SignUpForm(): JSX.Element {
  const { handleSubmit, control } = useForm<RegisterUserFields>({
    mode: 'onChange',
    defaultValues: {
      email: 'string',
      password: 'string',
      firstName: 'string',
      lastName: 'string',
      birthDate: new Date(),
      country: { value: '123', label: '123' },
      city: 'string',
      street: 'string',
      postal: 'string',
    },
  });

  const onSubmit: SubmitHandler<RegisterUserFields> = (data) => {
    return data;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper title="Create An account" buttonText="Sign Up">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return <TextInput id="1" placeholder="Email" label="Email *" {...field} />;
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return <PasswordInput id="2" placeholder="Password" label="Password *" {...field} />;
          }}
        />
        <Controller
          name="firstName"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return <TextInput id="3" placeholder="First name" label="First name *" {...field} />;
          }}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }): JSX.Element => {
            return <TextInput id="4" placeholder="Last name" label="Last name *" {...field} />;
          }}
        />
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => {
            return (
              <SelectInput
                id="5"
                placeholder="Select Country"
                title="Select Country"
                options={options}
                onChange={onChange}
                value={value}
                error={error}
              />
            );
          }}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => {
            return <DateInput id="6" title="Birth date" onChange={onChange} value={value} error={error} />;
          }}
        />
        <Controller
          name="city"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return <TextInput id="7" placeholder="City" label="City *" {...field} />;
          }}
        />
        <Controller
          name="street"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return <TextInput id="8" placeholder="Street" label="Street *" {...field} />;
          }}
        />
        <Controller
          name="postal"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return <TextInput id="9" placeholder="Postal" label="Postal *" {...field} />;
          }}
        />
        <FormText link={RoutesName.login} linkText="Sign In" text="Already have an account?" />
      </FormWrapper>
    </form>
  );
}

export default SignUpForm;
