import * as Yup from 'yup';

import { getDateForValidation } from '../../shared/helpers/validationFunctions';
import birthDateValidation from '../../shared/validation/model/agesValidation';
import cityValidation from '../../shared/validation/model/cityValidation';
import countryValidation from '../../shared/validation/model/countryValidation';
import emailValidation from '../../shared/validation/model/emailValidation';
import firstNameValidation from '../../shared/validation/model/firstNameValidation';
import lastNameValidation from '../../shared/validation/model/lastNameValidation';
import passwordValidation from '../../shared/validation/model/passwordValidation';
import streetValidation from '../../shared/validation/model/streetValidation';

describe('birthDateValidation', () => {
  it('validates a valid birth date', async () => {
    const validDate = getDateForValidation(25);

    const schema = Yup.object().shape({
      birthDate: birthDateValidation,
    });

    const validData = {
      birthDate: validDate,
    };

    const validationResult = await schema.validate(validData);

    expect(validationResult).toEqual(validData);
  });
});

describe('cityValidation', () => {
  it('validates a valid city', async () => {
    const schema = Yup.object().shape({
      city: cityValidation,
    });

    const validData = {
      city: 'Minsk',
    };

    const validationResult = await schema.validate(validData);

    expect(validationResult).toEqual(validData);
  });
});

describe('countryValidation', () => {
  it('validates an empty country', async () => {
    const schema = Yup.object().shape({
      label: countryValidation,
    });

    const invalidData = {
      label: '',
    };

    const isValid = await schema.isValid(invalidData);

    expect(isValid).toBe(false);
  });
});

describe('emailValidation', () => {
  it('validates a valid email address', async () => {
    const schema = Yup.string().required().concat(emailValidation);
    const validEmail = 'test@example.com';

    const isValid = await schema.isValid(validEmail);

    expect(isValid).toBe(true);
  });

  it('returns an error for an empty email address', async () => {
    const schema = Yup.string().required().concat(emailValidation);
    const emptyEmail = '';

    const isValid = await schema.isValid(emptyEmail);

    expect(isValid).toBe(false);
  });

  it('returns an error for an email address without a domain name', async () => {
    const schema = Yup.string().required().concat(emailValidation);
    const emailWithoutDomain = 'test@';

    const isValid = await schema.isValid(emailWithoutDomain);

    expect(isValid).toBe(false);
  });
});

describe('firstNameValidation', () => {
  it('returns an error for an empty first name', async () => {
    const schema = Yup.string().required().concat(firstNameValidation);
    const emptyFirstName = '';

    const isValid = await schema.isValid(emptyFirstName);

    expect(isValid).toBe(false);
  });

  it('returns an error for a first name containing numbers', async () => {
    const schema = Yup.string().required().concat(firstNameValidation);
    const firstNameWithNumbers = 'John123';

    const isValid = await schema.isValid(firstNameWithNumbers);

    expect(isValid).toBe(false);
  });

  it('returns an error for a first name containing special symbols', async () => {
    const schema = Yup.string().required().concat(firstNameValidation);
    const firstNameWithSpecialSymbols = 'John@';

    const isValid = await schema.isValid(firstNameWithSpecialSymbols);

    expect(isValid).toBe(false);
  });
});

describe('lastNameValidation', () => {
  it('validates a valid last name', async () => {
    const schema = Yup.string().required().concat(lastNameValidation);
    const validLastName = 'Doe';

    const isValid = await schema.isValid(validLastName);

    expect(isValid).toBe(true);
  });

  it('returns an error for an empty last name', async () => {
    const schema = Yup.string().required().concat(lastNameValidation);
    const emptyLastName = '';

    const isValid = await schema.isValid(emptyLastName);

    expect(isValid).toBe(false);
  });
});

describe('passwordValidation', () => {
  it('validates a valid password', async () => {
    const schema = Yup.string().required().concat(passwordValidation);
    const validPassword = 'Password123';

    const isValid = await schema.isValid(validPassword);

    expect(isValid).toBe(true);
  });

  it('returns an error for a password that does not meet the requirements', async () => {
    const schema = Yup.string().required().concat(passwordValidation);
    const invalidPassword = 'password';

    const isValid = await schema.isValid(invalidPassword);

    expect(isValid).toBe(false);
  });
});

describe('streetValidation', () => {
  it('validates a valid street', async () => {
    const schema = Yup.string().required().concat(streetValidation);
    const validStreet = '123 Main St';

    const isValid = await schema.isValid(validStreet);

    expect(isValid).toBe(true);
  });

  it('returns an error for an empty street', async () => {
    const schema = Yup.string().required().concat(streetValidation);
    const emptyStreet = '';

    const isValid = await schema.isValid(emptyStreet);

    expect(isValid).toBe(false);
  });

  it('returns an error for a street with leading or trailing whitespace', async () => {
    const schema = Yup.string().required().concat(streetValidation);
    const streetWithWhitespace = ' 123 Main St ';

    const isValid = await schema.isValid(streetWithWhitespace);

    expect(isValid).toBe(false);
  });
});
