import * as Yup from 'yup';

import { isNoNumbers, isNoSpecSymbols, leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const lastNameValidation = Yup.string()
  .required('Last name is required')
  .test(
    'no-leading-trailing-whitespace',
    'Last name must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  )
  .test('no-numbers', 'Last name must not contain any numbers', isNoNumbers)
  .test('no-special-symbols', 'Last name must not contain any special symbols', isNoSpecSymbols);

export default lastNameValidation;
