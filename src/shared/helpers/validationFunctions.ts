import { charsAndNumbersRegExp, digitsRegExp } from '../constants/regExpx';

export const leadingTrailingWhitespaceTest = (value: string): boolean => {
  if (!value) return true;
  return !(value.startsWith(' ') || value.endsWith(' '));
};

export const whitespaceInMiddleTest = (value: string): boolean => {
  if (!value) return true;
  return !/\S\s+\S/.test(value);
};

export const isNoNumbers = (value: string): boolean => {
  return !digitsRegExp.test(value);
};

export const isNoSpecSymbols = (value: string): boolean => {
  return charsAndNumbersRegExp.test(value);
};
