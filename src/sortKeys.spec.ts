import sortKeys from './sortKeys';

it('sorts keys by alphabetical order', () => {
  expect(
    JSON.stringify(
      sortKeys({
        b: '1',
        a: '2',
      }),
    ),
  ).toEqual(
    JSON.stringify({
      a: '2',
      b: '1',
    }),
  );
});
