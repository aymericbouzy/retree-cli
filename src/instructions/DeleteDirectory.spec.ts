import Tree from '../Tree';
import Path from '../Path';
import DeleteDirectory from './DeleteDirectory';

it('deletes directories', () => {
  expect(
    new DeleteDirectory(new Path(['src'])).execute(
      new Tree({
        src: {
          'hello.html': 'x',
        },
      }),
    ),
  ).toEqual(new Tree({}));
});
