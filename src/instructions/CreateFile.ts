import Tree from '../Tree';
import Instruction from '../Instruction';
import Path from '../Path';

export default class CreateFile extends Instruction {
  path: Path;
  id: string;

  constructor(path: Path, id: string) {
    super();
    this.path = path;
    this.id = id;
  }

  execute(input: Tree): Tree {
    if (input.getSubTree(this.path)) {
      return input;
    }
    return input.setSubTree(this.path, this.id);
  }

  toString(): string {
    return `touch ${this.path}`;
  }
}
