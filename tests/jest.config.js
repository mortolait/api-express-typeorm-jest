const { resolve } = require("path")
const root = resolve(__dirname,'..')
const rootConfig = require(`${root}/jest.config.js`)

module.exports = {...rootConfig, ...{
    rootDir: root,
    displayName: "e2e-tests",
    setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.ts'],
    testMatch: ["<rootDir>/tests/**/*.spec.ts"],
    globalSetup: '<rootDir>/tests/global.setup.js',
}}