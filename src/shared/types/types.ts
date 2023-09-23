import { Attribute, BaseAddress, CategoryReference, LocalizedString } from '@commercetools/platform-sdk';

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
  key?: string;
  categories: CategoryReference[];
  attributes: Attribute[];
  discountedPrice: string;
  originalPrice: string;
  imageLink: string;
  imageAlt: string;
  discount: number;
  description: string;
  title: string;
}

export interface ProductsResponse {
  convertedProductList: ProductCardData[];
  offset: number;
  totalProductsCount: number;
}

export interface SelectedProductData {
  id: string;
  attributes: Attribute[];
  discountedPrice: string;
  originalPrice: string;
  imageLinks: string[];
  discount: number;
  quantity: number;
  description: string;
  title: string;
}

interface UserAddress {
  id: string;
  country: CountriesOption | null;
  city: string;
  street: string;
  state: string;
  postalCode: string;
}

export interface NewAddress extends BaseAddress {
  version: number;
}

export interface UserDefaultAddress {
  id: string;
}

export interface UserData {
  email: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  version: number;
  addresses: UserAddress[];
  defaultShippingAddress?: UserDefaultAddress;
  defaultBillingAddress?: UserDefaultAddress;
  shippingAddress?: UserDefaultAddress[];
  billingAddress?: UserDefaultAddress[];
}

export interface PasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface InfoFields {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
}

export interface ProfileAddressFields {
  id?: string;
  country: CountriesOption | null;
  city: string;
  state: string;
  street: string;
  postalCode: string;
}

export interface FilterFields {
  weight: {
    from: number;
    to: number;
  };
  price: {
    from: number;
    to: number;
  };
  colors: string[];
}

export interface ColorsValue {
  value: string;
  isChecked: boolean;
}

export interface Sort {
  name: string;
  value: string;
  label?: string;
}

export interface CatalogCategory {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  parent?: CategoryReference;
  key?: string;
  children?: CatalogCategory[];
}

export type CategoriesObject = {
  [key: string]: CatalogCategory;
};
