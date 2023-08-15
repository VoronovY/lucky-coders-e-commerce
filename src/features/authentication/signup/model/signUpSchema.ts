import { object } from 'yup';

import emailValidation from '../../../../shared/validation/model/emailValidation';
import passwordValidation from '../../../../shared/validation/model/passwordValidation';
import firstNameValidation from '../../../../shared/validation/model/FirstNameValidation';
import lastNameValidation from '../../../../shared/validation/model/lastNameValidation';

const signUpSchema = object().shape({
  email: emailValidation,
  password: passwordValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
});

export default signUpSchema;
