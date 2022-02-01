import Path from './Path';
import Tree from './Tree';

describe('Tree', () => {
  describe('paths', () => {
    it('generates all paths', () => {
      expect(
        new Tree({
          src: { 'hello.html': '1' },
          'package.json': '2',
        }).paths(),
      ).toEqual([
        Path.fromString('src/hello.html'),
        Path.fromString('package.json'),
      ]);
    });
  });
});
