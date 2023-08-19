import { format } from 'date-fns';

import { Address, AddressRequestData, RegisterUserFields, SignUpRequestData } from '../types/types';

export const convertAddressData = (addr: Address[]): AddressRequestData[] => {
  const convertedAddresses = addr.map((address: Address): AddressRequestData => {
    return {
      country: address.country.iso,
      city: address.city,
      streetName: address.street,
      postalCode: address.postalCode,
    };
  });
  return convertedAddresses;
};

export const signUpConverter = (dataFromForm: RegisterUserFields): SignUpRequestData => {
  const { birthDate, address, ...rest } = dataFromForm;
  const convertedAddresses = convertAddressData(address);
  const formattedData: SignUpRequestData = {
    dateOfBirth: format(birthDate, 'yyy-MM-dd'),
    addresses: convertedAddresses,
    ...rest,
  };
  const defaultBillingAddress = address.findIndex((addr) => addr.isBillingAddress);
  const defaultShippingAddress = address.findIndex((addr) => addr.isShippingAddress);
  if (defaultBillingAddress >= 0) formattedData.defaultBillingAddress = defaultBillingAddress;
  if (defaultShippingAddress >= 0) formattedData.defaultShippingAddress = defaultShippingAddress;

  return formattedData;
};
