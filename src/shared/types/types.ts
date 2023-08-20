export interface CountriesOption {
  value: string;
  label: string;
  iso: string;
}

export interface Address {
  isBillingAddress: boolean;
  isShippingAddress: boolean;
  country: CountriesOption;
  city: string;
  street: string;
  postalCode: string;
}

export interface RegisterUserFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  address: Address[];
}

export interface AddressRequestData {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface SignUpRequestData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressRequestData[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}