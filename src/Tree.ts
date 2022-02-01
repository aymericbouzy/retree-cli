import Path from './Path';

export type TreeInput = { [key: string]: string | TreeInput };
export type SubTree = string | Tree;

function flat<T>(arrays: T[][]): T[] {
  const empty: T[] = [];
  return empty.concat(...arrays);
}

export default class Tree {
  raw: TreeInput;

  constructor(directories: TreeInput) {
    this.raw = directories;
  }

  setSubTree(path: Path, subTree: TreeInput | Tree | string | null): Tree {
    const [directoryOrFilename, subPath] = path.pop();
    if (!subPath) {
      if (subTree) {
        return new Tree({
          ...this.raw,
          [directoryOrFilename]:
            subTree instanceof Tree ? subTree.raw : subTree,
        });
      }
      const input = { ...this.raw };
      delete input[directoryOrFilename];
      return new Tree(input);
    }
    if (typeof this.raw[directoryOrFilename] !== 'object') {
      throw new Error('invalid navigation');
    }
    const updatedSubTree = new Tree(
      this.raw[directoryOrFilename] as TreeInput,
    ).setSubTree(subPath, subTree);
    return new Tree({
      ...this.raw,
      [directoryOrFilename]: updatedSubTree.raw,
    });
  }

  getSubTree(path: Path): SubTree | null {
    const [directoryOrFilename, subPath] = path.pop();
    if (!this.raw[directoryOrFilename]) {
      return null;
    }
    if (!subPath) {
      return Tree.makeSubTree(this.raw[directoryOrFilename]);
    }
    const subTree = this.raw[directoryOrFilename];
    if (typeof subTree === 'string') {
      throw new Error('invalid navigation');
    }
    return new Tree(subTree).getSubTree(subPath);
  }

  paths(): Path[] {
    return flat(
      Object.entries(this.raw).map(([directory, subTree]) => {
        if (typeof subTree === 'string') {
          return [Path.fromString(directory)];
        }
        return new Tree(subTree)
          .paths()
          .map((path) => new Path([directory, ...path.stack]));
      }),
    );
  }

  directories(): Path[] {
    return flat(
      Object.entries(this.raw).map(([directory, subTree]) => {
        if (typeof subTree === 'string') {
          return [];
        }
        return [
          Path.fromString(directory),
          ...new Tree(subTree)
            .directories()
            .map((path) => new Path([directory, ...path.stack])),
        ];
      }),
    );
  }

  getPathForId(id: string): Path | null {
    for (const path of this.paths()) {
      if (id === path.getId(this)) {
        return path;
      }
    }
    return null;
  }

  static makeSubTree(subTree: string | TreeInput): SubTree {
    if (typeof subTree === 'string') {
      return subTree;
    }
    return new Tree(subTree);
  }
}
