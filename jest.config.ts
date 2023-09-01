export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/shared/test/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!<rootDir>/node_modules/',
    '!src/entities/user/api/userApi.ts',
    '!src/shared/api/baseApi.ts',
    '!src/shared/api/clientBuilder/credentialsFlowClient.ts',
    '!src/shared/api/clientBuilder/passwordFlowClient.ts',
  ],
};
