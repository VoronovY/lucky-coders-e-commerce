import * as Yup from 'yup';

import countryValidation from '../../../shared/validation/model/countryValidation';
import cityValidation from '../../../shared/validation/model/cityValidation';
import streetValidation from '../../../shared/validation/model/streetValidation';
import postalCodeValidation from '../../../shared/validation/model/postalCodeValidation';
import stateValidation from '../../../shared/validation/model/stateValidation';

const addressSchema = Yup.object().shape({
  country: countryValidation,
  city: cityValidation,
  state: stateValidation,
  street: streetValidation,
  postalCode: postalCodeValidation,
});

export default addressSchema;
