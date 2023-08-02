export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
      "^.+\\.tsx?$": "ts-jest" 
  },
  moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/shared/test/__ mocks __/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
}