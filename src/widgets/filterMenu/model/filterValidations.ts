import * as Yup from 'yup';

const priceValidation = Yup.number()
  .required('Price is required')
  .min(0, 'Minimum price 0')
  .typeError('price must be a number');

export default priceValidation;
