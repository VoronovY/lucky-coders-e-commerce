import * as Yup from 'yup';

import { leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const postalCodeValidation = Yup.string()
  .required('Postal code is required')
  .test(
    'no-leading-trailing-whitespace',
    'City must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  )
  .test('test-postal-code-for-country', 'Choose country', function isCountryChoose(): boolean {
    const { parent } = this;
    return Boolean(parent.country?.value);
  });

export default postalCodeValidation;
