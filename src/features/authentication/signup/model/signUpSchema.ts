import * as Yup from 'yup';

import emailValidation from '../../../../shared/validation/model/emailValidation';
import passwordValidation from '../../../../shared/validation/model/passwordValidation';
import firstNameValidation from '../../../../shared/validation/model/firstNameValidation';
import lastNameValidation from '../../../../shared/validation/model/lastNameValidation';
import birthDateValidation from '../../../../shared/validation/model/agesValidation';
import countryValidation from '../../../../shared/validation/model/countryValidation';
import cityValidation from '../../../../shared/validation/model/cityValidation';
import streetValidation from '../../../../shared/validation/model/streetValidation';
import postalValidation from '../../../../shared/validation/model/postalValidation';

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
        postal: postalValidation,
      }),
    ),
  },
  [],
);

export default signUpSchema;
