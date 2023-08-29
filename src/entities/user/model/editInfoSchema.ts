import * as Yup from 'yup';

import firstNameValidation from '../../../shared/validation/model/firstNameValidation';
import emailValidation from '../../../shared/validation/model/emailValidation';
import birthDateValidation from '../../../shared/validation/model/agesValidation';
import lastNameValidation from '../../../shared/validation/model/lastNameValidation';

const editInfoSchema = Yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  birthDate: birthDateValidation,
});

export default editInfoSchema;
