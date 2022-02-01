import Instruction from '../Instruction';
import Path from '../Path';
import Tree from '../Tree';

export default class DeleteFile extends Instruction {
  path: Path;

  constructor(path: Path) {
    super();
    this.path = path;
  }

  execute(input: Tree): Tree {
    return input.setSubTree(this.path, null);
  }

  toString(): string {
    return `rm ${this.path}`;
  }
}
