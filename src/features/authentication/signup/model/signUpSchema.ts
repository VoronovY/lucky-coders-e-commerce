import { object } from 'yup';

import emailValidation from '../../../../shared/validation/model/emailValidation';
import passwordValidation from '../../../../shared/validation/model/passwordValidation';
import firstNameValidation from '../../../../shared/validation/model/firstNameValidation';
import lastNameValidation from '../../../../shared/validation/model/lastNameValidation';
import birthDateValidation from '../../../../shared/validation/model/agesValidation';
import countryValidation from '../../../../shared/validation/model/countryValidation';

const signUpSchema = object().shape({
  email: emailValidation,
  password: passwordValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  birthDate: birthDateValidation,
  country: countryValidation,
});

export default signUpSchema;
