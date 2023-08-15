import * as Yup from 'yup';

const countryValidation = Yup.object()
  .shape({
    label: Yup.string().test('country-validation', 'Country is required', (value: string | undefined): boolean => {
      return value !== '';
    }),
  })
  .required('Country is required');

export default countryValidation;
