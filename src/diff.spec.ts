import diff from './diff';
import Tree, { TreeInput } from './Tree';

function expectInstructions({
  input,
  output,
  debug = false,
}: {
  input: TreeInput;
  output: TreeInput;
  debug?: boolean;
}) {
  const instructionList = diff({
    input: new Tree(input),
    output: new Tree(output),
  });
  if (debug) {
    console.log(instructionList.toString());
  }
  expect(instructionList.execute(new Tree(input))).toEqual(new Tree(output));
}

describe('diff', () => {
  it('works if output is same as input', async () => {
    expectInstructions({
      input: {},
      output: {},
    });

    expectInstructions({
      input: {
        'hello.html': '123',
      },
      output: {
        'hello.html': '123',
      },
    });
  });

  it('tells which files to create', async () => {
    expectInstructions({
      input: {},
      output: {
        'hello.html': '0',
      },
    });
  });

  it('tells which files to copy', async () => {
    expectInstructions({
      input: {
        'hello.html': '0',
      },
      output: {
        'hello.html': '0',
        'hello2.html': '0',
      },
    });
  });

  it('tells which files to erase', async () => {
    expectInstructions({
      input: {
        'hello.html': '1',
      },
      output: {
        'hello.html': '0',
      },
    });
  });

  it('tells which files to exchange', async () => {
    expectInstructions({
      input: {
        '400.html': '500',
        '500.html': '400',
      },
      output: {
        '400.html': '400',
        '500.html': '500',
      },
    });
  });

  it('tells which directories to create', async () => {
    expectInstructions({
      input: {},
      output: {
        src: {
          'hello.html': '0',
        },
      },
    });
  });

  it('tells how to not erase a file that becomes a directory', async () => {
    expectInstructions({
      input: {
        src: '0',
      },
      output: {
        src: {
          'hello.html': '0',
        },
      },
    });
  });

  it('tells which files to rename', async () => {
    expectInstructions({
      input: {
        'hello.html': '123',
      },
      output: {
        'hello2.html': '123',
      },
    });
  });

  it('tells which files to remove', async () => {
    expectInstructions({
      input: {
        'hello.html': '123',
      },
      output: {},
    });
  });

  it('tells which directories to remove', async () => {
    expectInstructions({
      input: {
        src: {
          'hello.html': '123',
        },
      },
      output: {},
    });
  });

  it('tells how to rename directories', async () => {
    expectInstructions({
      input: {
        src: {
          'hello.html': '123',
        },
      },
      output: {
        source: {
          'hello.html': '123',
        },
      },
    });
  });

  it('works with arbitrarily nested structure', async () => {
    expectInstructions({
      input: {
        src: {
          app: {
            'hello.html': '123',
          },
        },
        'package.json': '456',
      },
      output: {
        source: {
          'hello.html': '123',
        },
      },
    });
  });

  it('works', async () => {
    expectInstructions({
      input: {
        src: {
          app: {
            'hello.html': '123',
          },
        },
        'package.json': '456',
      },
      output: {
        test: 'a',
        src: {
          app: {
            'hello.html': '123',
          },
        },
        'package.json': '456',
      },
    });
  });
});
