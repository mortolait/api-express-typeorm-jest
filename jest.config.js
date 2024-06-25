const { resolve } = require("path");
const root = resolve(__dirname)

module.exports = {
    rootDir: root,
    displayName: 'unit-tests',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ['dotenv/config'],
  };