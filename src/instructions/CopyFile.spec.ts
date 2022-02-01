import Tree from '../Tree';
import Path from '../Path';
import CopyFile from './CopyFile';

it('copies files', () => {
  expect(
    new CopyFile(new Path(['hello.html']), new Path(['hello2.html'])).execute(
      new Tree({
        'hello.html': 'x',
      }),
    ),
  ).toEqual(
    new Tree({
      'hello.html': 'x',
      'hello2.html': 'x',
    }),
  );
});

it('erases existing file', () => {
  expect(
    new CopyFile(new Path(['hello.html']), new Path(['hello2.html'])).execute(
      new Tree({
        'hello.html': 'x',
        'hello2.html': 'y',
      }),
    ),
  ).toEqual(
    new Tree({
      'hello.html': 'x',
      'hello2.html': 'x',
    }),
  );
});

it('copies nested files', () => {
  expect(
    new CopyFile(
      new Path(['src', 'hello.html']),
      new Path(['hello2.html']),
    ).execute(
      new Tree({
        src: {
          'hello.html': 'x',
        },
      }),
    ),
  ).toEqual(
    new Tree({
      src: {
        'hello.html': 'x',
      },
      'hello2.html': 'x',
    }),
  );
});
