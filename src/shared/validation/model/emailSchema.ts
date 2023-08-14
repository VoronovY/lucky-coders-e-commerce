import { ObjectSchema, object, string } from 'yup';

import { leadingTrailingWhitespaceTest, whitespaceInMiddleTest } from '../../helpers/whitespaceTests';

interface EmailFieldScheme {
  email: string;
}

const emailSchema: ObjectSchema<EmailFieldScheme> = object().shape({
  email: string()
    .required('Email is required')
    .test(
      'no-leading-trailing-whitespace',
      'Email address must not contain leading or trailing whitespace',
      leadingTrailingWhitespaceTest,
    )
    .test(
      'no-whitespace-in-middle',
      'Email address must not contain whitespace in the middle of the string',
      whitespaceInMiddleTest,
    )
    .test('contains-at-symbol', "Email address must contain an '@' symbol", (value) => {
      if (!value) return true;
      return value.includes('@');
    })
    .test('contains-domain', 'Email address must contain a domain name (e.g., example.com)', (value) => {
      if (!value) return true;
      const trimmedValue = value.replace(/\s/g, '');
      const domainRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      const isValidFormat = domainRegex.test(trimmedValue);
      const hasDomainName = trimmedValue.split('@')[1]?.length > 0;
      return isValidFormat && hasDomainName;
    }),
});

export default emailSchema;
