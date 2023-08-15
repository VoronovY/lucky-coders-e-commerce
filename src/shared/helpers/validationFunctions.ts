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

export const getDateForValidation = (years: number): Date => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();

  return new Date(year - years, month, day);
};
