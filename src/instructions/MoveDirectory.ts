import Instruction from '../Instruction';
import Path from '../Path';
import Tree from '../Tree';

export default class MoveDirectory extends Instruction {
  from: Path;
  to: Path;

  constructor(from: Path, to: Path) {
    super();
    this.from = from;
    this.to = to;
  }

  execute(input: Tree): Tree {
    const subTree = input.getSubTree(this.from);
    return input.setSubTree(this.to, subTree).setSubTree(this.from, null);
  }

  toString(): string {
    return `mv ${this.from} ${this.to}`;
  }
}
