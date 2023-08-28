import * as Yup from 'yup';

import { isNoNumbers, isNoSpecSymbols, leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const stateValidation = Yup.string()
  .required('State is required')
  .test(
    'no-leading-trailing-whitespace',
    'State must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  )
  .test('no-numbers', 'State must not contain any numbers', isNoNumbers)
  .test('no-special-symbols', 'State must not contain any special symbols', isNoSpecSymbols);

export default stateValidation;
