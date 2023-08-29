import * as Yup from 'yup';

import { priceValidation, weightValidation } from './filterValidations';

const filterMenuSchema = Yup.object().shape({
  weight: Yup.object().shape({
    from: weightValidation,
    to: weightValidation,
  }),
  price: Yup.object().shape({
    from: priceValidation,
    to: priceValidation,
  }),
});

export default filterMenuSchema;
