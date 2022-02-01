import Instruction from '../Instruction';
import Path from '../Path';
import Tree from '../Tree';

export default class CreateDirectory extends Instruction {
  path: Path;

  constructor(path: Path) {
    super();
    this.path = path;
  }

  execute(input: Tree): Tree {
    return input.setSubTree(this.path, {});
  }

  toString(): string {
    return `mkdir ${this.path}`;
  }
}
