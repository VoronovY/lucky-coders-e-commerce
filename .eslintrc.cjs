module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', "jest.config.ts", 'vite.config.ts', 'jest-setup.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react-refresh',"@typescript-eslint", 'prettier'],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/extensions": "off",
      "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/array-type": [
      "error",
      {
        "default": "array"
      }
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        "accessibility": "explicit",
        "overrides": {
          "accessors": "explicit",
          "constructors": "off",
          "methods": "explicit",
          "properties": "explicit",
          "parameterProperties": "explicit"
        }
      }
    ],
    "max-lines-per-function": ["error", 40],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": ["error"],
    "@typescript-eslint/no-non-null-assertion": "error",
    "import/no-extraneous-dependencies": [
    "error",
      {
       "devDependencies": ["**/*.test.ts", "**/*.test.js", "**/*.test.tsx", "**/*.test.jsx"]
      } 
    ]
  },
}
