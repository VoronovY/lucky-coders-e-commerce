import axios from 'axios';

import getErrorMessage from '../../shared/helpers/routerHelpres';
import { charsAndNumbersRegExp, digitsRegExp } from '../../shared/constants/regExpx';
import { getDateForValidation, vailadtePostalCode } from '../../shared/helpers/validationFunctions';

jest.mock('axios');

describe('getErrorMessage', () => {
  it('should return the message from an instance of Error', () => {
    const error = new Error('Custom error message');
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Custom error message');
  });

  it('should return the error string as is', () => {
    const error = 'Error string';
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Error string');
  });

  it('should return "Unknown error" for unknown error types', () => {
    const error = { foo: 'bar' };
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Unknown error');
  });
});

describe('charsAndNumbersRegExp', () => {
  it('should match strings containing only letters and numbers', () => {
    expect(charsAndNumbersRegExp.test('abc123')).toBe(true);
    expect(charsAndNumbersRegExp.test('ABCXYZ789')).toBe(true);
    expect(charsAndNumbersRegExp.test('HelloWorld123')).toBe(true);
  });

  it('should not match strings containing special characters', () => {
    expect(charsAndNumbersRegExp.test('!@#$%')).toBe(false);
    expect(charsAndNumbersRegExp.test('Hello, World!')).toBe(false);
    expect(charsAndNumbersRegExp.test('123-456')).toBe(false);
  });
});

describe('digitsRegExp', () => {
  it('should match strings containing at least one digit', () => {
    expect(digitsRegExp.test('abc123')).toBe(true);
    expect(digitsRegExp.test('ABCXYZ789')).toBe(true);
    expect(digitsRegExp.test('HelloWorld123')).toBe(true);
    expect(digitsRegExp.test('The answer is 42')).toBe(true);
  });

  it('should not match strings containing no digits', () => {
    expect(digitsRegExp.test('abc')).toBe(false);
    expect(digitsRegExp.test('ABCXYZ')).toBe(false);
    expect(digitsRegExp.test('HelloWorld')).toBe(false);
  });
});

describe('getDateForValidation', () => {
  it('returns the correct date for validation', () => {
    const years = 5;
    const currentDate = new Date();
    const expectedDate = new Date(currentDate.getFullYear() - years, currentDate.getMonth(), currentDate.getDate());

    const result = getDateForValidation(years);

    expect(result).toEqual(expectedDate);
  });
});

describe('vailadtePostalCode', () => {
  it('returns true for a valid postal code', async () => {
    const value = '12345';
    const iso = 'US';
    const responseData = true;
    jest.spyOn(axios, 'get').mockResolvedValue({ data: responseData });

    const result = await vailadtePostalCode(value, iso);

    expect(result).toBe(true);
    expect(axios.get).toHaveBeenCalledWith(`https://api.zippopotam.us/${iso}/${value}`);
    jest.spyOn(axios, 'get').mockRestore();
  });

  it('throws an error for network failure', async () => {
    const value = '12345';
    const iso = 'US';
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));

    await expect(vailadtePostalCode(value, iso)).rejects.toThrow(Error);
    expect(axios.get).toHaveBeenCalledWith(`https://api.zippopotam.us/${iso}/${value}`);
    jest.spyOn(axios, 'get').mockRestore();
  });
});
