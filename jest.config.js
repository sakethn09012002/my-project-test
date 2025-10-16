module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/tests/**/*.test.js',
        '**/src/tests/**/*.test.js',
    ],
    setupFilesAfterEnv: [],
    transform: {},
    moduleNameMapper: {},
    collectCoverage: false,
    testPathIgnorePatterns: ['/node_modules/', '/.next/'], // ignore .next folder
};
