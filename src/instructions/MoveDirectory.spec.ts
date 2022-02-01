import Tree from '../Tree';
import Path from '../Path';
import MoveDirectory from './MoveDirectory';

it('renames directories', () => {
  expect(
    new MoveDirectory(
      Path.fromString('src'),
      Path.fromString('source'),
    ).execute(
      new Tree({
        src: {
          'hello.html': 'x',
        },
      }),
    ),
  ).toEqual(
    new Tree({
      source: {
        'hello.html': 'x',
      },
    }),
  );
});
