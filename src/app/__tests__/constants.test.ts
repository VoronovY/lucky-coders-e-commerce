import catalogLinks from '../../shared/constants/catalogLinks';
import countries from '../../shared/constants/countries';
import passwordErrorItems from '../../shared/constants/passwordErrorsItems';
import { charsAndNumbersRegExp, digitsRegExp } from '../../shared/constants/regExpx';

describe('catalogLinks', () => {
  it('should have unique IDs for each link object', () => {
    const ids = catalogLinks.map((link) => link.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds.length).toBe(ids.length);
  });

  it('should have paths that start with "/catalog"', () => {
    const paths = catalogLinks.map((link) => link.path);
    const isPathValid = paths.every((path) => path.startsWith('/catalog'));
    expect(isPathValid).toBe(true);
  });
});

describe('passwordErrorItems', () => {
  it('should pass all conditions for a valid password', () => {
    const validPassword = 'Password123';

    const errors = passwordErrorItems.filter((item) => item.condition(validPassword));

    expect(errors).toHaveLength(0);
  });

  it('should fail the condition for an invalid password with less than 8 characters', () => {
    const invalidPassword = 'pass123';

    const errors = passwordErrorItems.filter((item) => item.condition(invalidPassword));

    expect(errors).toContainEqual(expect.objectContaining({ id: 1 }));
  });

  it('should fail the condition for an invalid password without an uppercase letter', () => {
    const invalidPassword = 'password123';

    const errors = passwordErrorItems.filter((item) => item.condition(invalidPassword));

    expect(errors).toContainEqual(expect.objectContaining({ id: 2 }));
  });

  it('should fail the condition for an invalid password without a lowercase letter', () => {
    const invalidPassword = 'PASSWORD123';

    const errors = passwordErrorItems.filter((item) => item.condition(invalidPassword));

    expect(errors).toContainEqual(expect.objectContaining({ id: 3 }));
  });

  it('should fail the condition for an invalid password without a digit', () => {
    const invalidPassword = 'Password';

    const errors = passwordErrorItems.filter((item) => item.condition(invalidPassword));

    expect(errors).toContainEqual(expect.objectContaining({ id: 4 }));
  });
});

describe('charsAndNumbersRegExp', () => {
  it('should not match strings containing special characters', () => {
    const invalidStrings = ['abc!@#', 'XYZ$%^', 'абв!@#', 'ЁЖЗ$%^'];

    invalidStrings.forEach((str) => {
      expect(charsAndNumbersRegExp.test(str)).toBe(false);
    });
  });
});

describe('digitsRegExp', () => {
  it('should match strings containing at least one digit', () => {
    const validStrings = ['abc123', 'XYZ456', 'абв123', 'ЁЖЗ789'];

    validStrings.forEach((str) => {
      expect(digitsRegExp.test(str)).toBe(true);
    });
  });

  it('should not match strings containing only letters', () => {
    const invalidStrings = ['abc', 'XYZ', 'абв', 'ЁЖЗ'];

    invalidStrings.forEach((str) => {
      expect(digitsRegExp.test(str)).toBe(false);
    });
  });
});

describe('countries', () => {
  it('should contain a valid list of countries', () => {
    expect(countries).toBeInstanceOf(Array);

    countries.forEach((country) => {
      expect(country).toHaveProperty('label');
      expect(country).toHaveProperty('value');
      expect(country).toHaveProperty('iso');
    });
  });

  it('should not contain duplicate ISO codes', () => {
    const isoSet = new Set<string>();

    countries.forEach((country) => {
      expect(isoSet.has(country.iso)).toBe(false);
      isoSet.add(country.iso);
    });
  });
});
