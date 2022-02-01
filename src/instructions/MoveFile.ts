import Instruction from '../Instruction';
import Path from '../Path';
import Tree from '../Tree';
import CopyFile from './CopyFile';
import DeleteFile from './DeleteFile';

export default class MoveFile extends Instruction {
  from: Path;
  to: Path;

  constructor(from: Path, to: Path) {
    super();
    this.from = from;
    this.to = to;
  }

  execute(input: Tree): Tree {
    return new CopyFile(this.from, this.to)
      .then(new DeleteFile(this.from))
      .execute(input);
  }

  toString(): string {
    return `mv ${this.from} ${this.to}`;
  }
}
