module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // keep your setup if needed
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // uses Babel for modern JSX transform
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next|@mui|@imtf|lodash-es)/)',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
};
