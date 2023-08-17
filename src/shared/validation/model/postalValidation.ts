import * as Yup from 'yup';

import { leadingTrailingWhitespaceTest } from '../../helpers/validationFunctions';

const postalValidation = Yup.string()
  .required('City is required')
  .test(
    'no-leading-trailing-whitespace',
    'City must not contain leading or trailing whitespace',
    leadingTrailingWhitespaceTest,
  )
  .test('test-postal-for-country', 'Choose country', function isCountryChoose(): boolean {
    const { parent } = this;
    return Boolean(parent.country?.value);
  });

export default postalValidation;
