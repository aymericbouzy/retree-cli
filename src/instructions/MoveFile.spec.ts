import Tree from '../Tree';
import Path from '../Path';
import MoveFile from './MoveFile';

it('renames files', () => {
  expect(
    new MoveFile(new Path(['hello.html']), new Path(['hello2.html'])).execute(
      new Tree({
        'hello.html': 'x',
      }),
    ),
  ).toEqual(
    new Tree({
      'hello2.html': 'x',
    }),
  );
});

it('renames nested files', () => {
  expect(
    new MoveFile(
      new Path(['src', 'hello.html']),
      new Path(['src', 'hello2.html']),
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
        'hello2.html': 'x',
      },
    }),
  );
});
