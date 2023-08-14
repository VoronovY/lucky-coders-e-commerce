export const leadingTrailingWhitespaceTest = (value: string): boolean => {
  if (!value) return true;
  return !(value.startsWith(' ') || value.endsWith(' '));
};

export const whitespaceInMiddleTest = (value: string): boolean => {
  if (!value) return true;
  return !/\S\s+\S/.test(value);
};
