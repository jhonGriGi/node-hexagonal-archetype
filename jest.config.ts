/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: ['app/**/*.{js,jsx,ts,tsx}', '!<rootDir>/node_modules/'],
    testMatch: ['**/tests/**/*.test.ts'],
    modulePathIgnorePatterns: [
        'app/domain/Builders/',
        'app/domain/exceptions/',
        'app/domain/model/',
        'app/domain/ports/',
        'app/libraries',
        'app/entrypoints/schemas',
    ],
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
