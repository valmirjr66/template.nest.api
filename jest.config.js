/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!app.module.ts',
    '!main.ts',
    '!**/controller/*.(t|j)s',
    '!**/repository/**/*.(t|j)s',
    '!**/constants/*.(t|j)s',
    '!**/model/*.(t|j)s',
  ],
  coverageDirectory: '../coverage',
};
