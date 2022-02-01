import Tree from './Tree';
import { v4 as uuid } from 'uuid';

export default class Path {
  constructor(readonly stack: string[]) {}

  static fromString(path: string): Path {
    return new Path(path.split('/'));
  }

  toString(): string {
    return this.stack.join('/');
  }

  getId(tree: Tree): string | null {
    const subTree = tree.getSubTree(this);

    if (typeof subTree === 'string') {
      return subTree;
    }

    return null;
  }

  static temp(): Path {
    return Path.fromString(`${uuid()}.tmp`);
  }

  pop(): [string, Path | null] {
    const [directoryOrFilename, ...stack] = this.stack;
    return [directoryOrFilename, stack.length ? new Path(stack) : null];
  }
}
