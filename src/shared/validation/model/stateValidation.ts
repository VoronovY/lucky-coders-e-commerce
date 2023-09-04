import * as Yup from 'yup';

import { isNoSpecSymbols, leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const stateValidation = Yup.string()
  .test(
    'no-leading-trailing-whitespace',
    'State must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  )
  .test('no-special-symbols', 'State must not contain any special symbols', isNoSpecSymbols);

export default stateValidation;
