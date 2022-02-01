import Tree from '../Tree';
import Path from '../Path';
import DeleteFile from './DeleteFile';

it('deletes files', () => {
  expect(
    new DeleteFile(new Path(['hello.html'])).execute(
      new Tree({
        'hello.html': 'x',
      }),
    ),
  ).toEqual(new Tree({}));
});

it('deletes nested files', () => {
  expect(
    new DeleteFile(Path.fromString('src/hello.html')).execute(
      new Tree({
        src: {
          'hello.html': 'x',
        },
      }),
    ),
  ).toEqual(
    new Tree({
      src: {},
    }),
  );
});
