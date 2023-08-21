const passwordErrorItems = [
  {
    id: 1,
    condition: (value: string): boolean => value.length < 8,
    text: 'at least 8 characters',
  },
  {
    id: 2,
    condition: (value: string): boolean => !/[A-Z]/.test(value),
    text: 'at least one uppercase letter (A-Z)',
  },
  {
    id: 3,
    condition: (value: string): boolean => !/[a-z]/.test(value),
    text: 'at least one lowercase letter (a-z)',
  },
  {
    id: 4,
    condition: (value: string): boolean => !/\d/.test(value),
    text: 'at least one digit (0-9)',
  },
];

export default passwordErrorItems;
