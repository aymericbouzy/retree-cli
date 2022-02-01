import Tree from '../Tree';
import Path from '../Path';
import CreateFile from './CreateFile';

it('creates files', () => {
  expect(
    new CreateFile(new Path(['hello.html']), 'abc').execute(new Tree({})),
  ).toEqual(
    new Tree({
      'hello.html': 'abc',
    }),
  );
});

it('does not erase files', () => {
  expect(
    new CreateFile(new Path(['hello.html']), 'abc').execute(
      new Tree({
        'hello.html': 'x',
      }),
    ),
  ).toEqual(
    new Tree({
      'hello.html': 'x',
    }),
  );
});

it('creates nested files', () => {
  expect(
    new CreateFile(new Path(['src', 'hello.html']), 'abc').execute(
      new Tree({ src: {} }),
    ),
  ).toEqual(
    new Tree({
      src: {
        'hello.html': 'abc',
      },
    }),
  );
});
