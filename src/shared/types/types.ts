import { OptionInput } from '../ui/select/SelectInput';

export interface CountriesOption {
  value: string;
  label: string;
  iso: string;
}

export interface Address {
  isBillingAddress: boolean;
  isShippingAddress: boolean;
  country: OptionInput;
  city: string;
  street: string;
  postal: string;
}

export interface RegisterUserFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  address: Address[];
}
