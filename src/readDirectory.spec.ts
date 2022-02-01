import counter from './counter';
import Path from './Path';
import Tree, { TreeInput } from './Tree';
import readDirectory from './readDirectory';

const mockedFileSystemReader = (directory: TreeInput) => async (
  stringPath: string,
) => {
  const stack = stringPath
    .split('/')
    .filter((name) => name !== '.')
    .filter(Boolean);

  const subTree = stack.length
    ? new Tree(directory).getSubTree(new Path(stack))
    : new Tree(directory);
  if (typeof subTree !== 'object' || subTree === null) {
    throw new Error('cannot read non directory');
  }
  return Object.entries(subTree.raw).map(([name, tree]) => ({
    name,
    isFile: typeof tree === 'string',
  }));
};

it('creates a tree representation of the current directory', async () => {
  const DIRECTORY = {
    src: {
      instructions: {
        CopyFile: '0',
        CreateDirectory: '1',
      },
    },
  };

  expect(
    await readDirectory('./', {
      fileSystemReader: mockedFileSystemReader(DIRECTORY),
      generateId: counter(),
    }),
  ).toEqual(DIRECTORY);
});

it('ignores some directories', async () => {
  const DIRECTORY = {
    '.git': {},
  };

  expect(
    await readDirectory('./', {
      fileSystemReader: mockedFileSystemReader(DIRECTORY),
      generateId: counter(),
      ignore: ['.git'],
    }),
  ).toEqual({});
});
