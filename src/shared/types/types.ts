import { Attribute } from '@commercetools/platform-sdk';

export interface CountriesOption {
  value: string;
  label: string;
  iso: string;
}

export interface Address {
  isBillingAddress: boolean;
  isShippingAddress: boolean;
  country: CountriesOption | null;
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

export interface ProductCardData {
  id: string;
  attributes: Attribute[];
  discountedPrice: string;
  originalPrice: string;
  imageLink: string;
  imageAlt: string;
  discount: number;
  description: string;
  title: string;
}

interface UserAddress {
  country: string;
  city: string;
  street: string;
  postalCode: string;
}
export interface UserData {
  email: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  addresses: UserAddress[];
}
