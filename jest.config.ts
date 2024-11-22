/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testMatch: ['**/tests/unit/*.test.ts'],
    moduleNameMapper: {
        '^@domain/(.*)$': '<rootDir>/app/domain/$1',
        '^@adapters/(.*)$': '<rootDir>/app/adapters/$1',
        '^@lambda/(.*)$': '<rootDir>/app/entrypoints/lambda/$1',
        '^@schemas/(.*)$': '<rootDir>/app/entrypoints/schemas/$1',
        '^@libraries/(.*)$': '<rootDir>/app/libraries/$1',
        '^@ports/(.*)$': '<rootDir>/app/domain/ports/$1',
        '^@model/(.*)$': '<rootDir>/app/domain/model/$1',
    },
};
