import * as Yup from 'yup';

import { isNoNumbers, isNoSpecSymbols, leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const cityValidation = Yup.string()
  .required('City is required')
  .test(
    'no-leading-trailing-whitespace',
    'City must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  )
  .test('no-numbers', 'City must not contain any numbers', isNoNumbers)
  .test('no-special-symbols', 'City must not contain any special symbols', isNoSpecSymbols);

export default cityValidation;
