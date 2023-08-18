import * as Yup from 'yup';

import emailValidation from '../../../../shared/validation/model/emailValidation';
import passwordValidation from '../../../../shared/validation/model/passwordValidation';
import firstNameValidation from '../../../../shared/validation/model/firstNameValidation';
import lastNameValidation from '../../../../shared/validation/model/lastNameValidation';
import birthDateValidation from '../../../../shared/validation/model/agesValidation';
import countryValidation from '../../../../shared/validation/model/countryValidation';
import cityValidation from '../../../../shared/validation/model/cityValidation';
import streetValidation from '../../../../shared/validation/model/streetValidation';
import postalCodeValidation from '../../../../shared/validation/model/postalCodeValidation';

const signUpSchema = Yup.object().shape(
  {
    email: emailValidation,
    password: passwordValidation,
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    birthDate: birthDateValidation,
    address: Yup.array().of(
      Yup.object().shape({
        country: countryValidation,
        city: cityValidation,
        street: streetValidation,
        postalCode: postalCodeValidation,
      }),
    ),
  },
  [],
);

export default signUpSchema;
