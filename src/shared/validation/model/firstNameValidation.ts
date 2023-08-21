import * as Yup from 'yup';

import { isNoNumbers, isNoSpecSymbols, leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const firstNameValidation = Yup.string()
  .required('First name is required')
  .test(
    'no-leading-trailing-whitespace',
    'First name must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  )
  .test('no-numbers', 'First name must not contain any numbers', isNoNumbers)
  .test('no-special-symbols', 'First name must not contain any special symbols', isNoSpecSymbols);

export default firstNameValidation;
