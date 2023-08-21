import * as Yup from 'yup';

import { leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const streetValidation = Yup.string()
  .required('Street is required')
  .test(
    'no-leading-trailing-whitespace',
    'City must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  );

export default streetValidation;
