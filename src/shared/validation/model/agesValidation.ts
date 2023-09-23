import * as Yup from 'yup';

import { getDateForValidation } from '../../helpers/validationFunctions';

const birthDateValidation = Yup.date()
  .required('Date of birth is required')
  .min(getDateForValidation(100), 'Age must be no more than 100 years')
  .max(getDateForValidation(16), 'Age must be at least 16 years');

export default birthDateValidation;
