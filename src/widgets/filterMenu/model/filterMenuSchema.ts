import * as Yup from 'yup';

import priceValidation from './filterValidations';

const filterMenuSchema = Yup.object().shape({
  weight: Yup.object().shape({
    from: priceValidation,
    to: priceValidation,
  }),
  price: Yup.object().shape({
    from: priceValidation,
    to: priceValidation,
  }),
});

export default filterMenuSchema;
