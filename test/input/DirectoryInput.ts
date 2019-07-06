import { DirectoryInput } from '~src/input/DirectoryInput'
import fs from 'fs'

jest.mock('fs');

const mockedFs = fs as unknown as MockedFs

function mockFiles(files: { [path: string]: string }): void {
  mockedFs.__setMockFiles(files)
}

describe('DirectoryInput', () => {

  describe('a valid submission with extra files', () => {
    const SOLUTION_FILES = {
      '/path/to/solution/a.ts': 'export const a(): void {}',
      '/path/to/solution/two-fer.ts': 'export const twoFer(): void {}',
      '/path/to/solution/two-fer.test.ts': 'describe("a test", (): void => { it("is true") { expect(true).toBe(true) }}})',
      '/path/to/solution/README.md': '# My Readme',
      '/path/to/solution/z.ts': 'export const z(): void {}',
      '/random/other/path/two-fer.ts': 'export const nope(): void {}'
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('can find a source file', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(1)

      expect(files.length).toBe(1);
    });

    test('it excludes files that are not .ts', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/README.md'])
    });

    test('it excludes files that are .test.ts', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/two-fer.test.ts'])
    });

    test('it prefers <slug>.ts', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const [file, ...others] = await input.read(1)

      expect(others.length).toBe(0);
      expect(file).toBe(SOLUTION_FILES['/path/to/solution/two-fer.ts'])
    });
  });

  describe('an invalid submission with only a test file', () => {
    const SOLUTION_FILES = {
      '/path/to/solution/two-fer.test.ts': 'describe("a test", (): void => { it("is true") { expect(true).toBe(true) }}})',
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('can not find a source file', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(1)

      expect(files.length).toBe(0);
    });
  })

  describe('a valid submission with all files', () => {

    const SOLUTION_FILES = {
      '/path/to/solution/.exercism/metadata.json': '{"track":"typescript","exercise":"two-fer"}',
      '/path/to/solution/node_modules/@babel/cli/index.js': 'throw new Error("Use the `@babel/core` package instead of `@babel/cli`.")',
      '/path/to/solution/.eslintrc': '{ "extends": [ "eslint: recommended" ] }',
      '/path/to/solution/babel.config.js': 'module.exports = { presets: [ "@babel/env" ] }',
      '/path/to/solution/.eslintrc.js': 'module.exports = { extends: [ "eslint: recommended" ] }',
      '/path/to/solution/jest.config.js': 'module.exports = { "transform": { "^.+\\.[jt]sx?$"": "babel-jest" } }',
      '/path/to/solution/package-lock.json': '{ "name": "exercism-typescript" }',
      '/path/to/solution/package.json': '{ "name": "exercism-typescript" }',
      '/path/to/solution/two-fer.ts': 'export const twoFer(): void {}',
      '/path/to/solution/two-fer.test.ts': 'describe("a test", (): void => { it("is true") { expect(true).toBe(true) }}})',
      '/path/to/solution/README.md': '# Two Fer',
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('can find a source file', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(1)

      expect(files.length).toBe(1);
    });

    test('it excludes files that are not .ts', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/README.md'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/package.json'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/package-lock.json'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/.eslintrc'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/.exercism/metadata.json'])
    });

    test('it excludes files that are .test.ts', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/two-fer.test.ts'])
    });

    test('it excludes files that are configuration', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/.eslintrc.js'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/babel.config.js'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/jest.config.js'])
    });

    test('it prefers <slug>.ts', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const [file, ...others] = await input.read(1)

      expect(others.length).toBe(0);
      expect(file).toBe(SOLUTION_FILES['/path/to/solution/two-fer.ts'])
    });
  })
});
