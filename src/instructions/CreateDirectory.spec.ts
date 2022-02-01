import Tree from '../Tree';
import Path from '../Path';
import CreateDirectory from './CreateDirectory';

it('creates directories', () => {
  expect(new CreateDirectory(new Path(['src'])).execute(new Tree({}))).toEqual(
    new Tree({ src: {} }),
  );
});

it('creates nested directories', () => {
  expect(
    new CreateDirectory(Path.fromString('src/app')).execute(
      new Tree({
        src: {},
      }),
    ),
  ).toEqual(
    new Tree({
      src: {
        app: {},
      },
    }),
  );
});
