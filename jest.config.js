module.exports = {
  roots: ['<rootDir>/__jest__'],
  testRegex: '__jest__/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
