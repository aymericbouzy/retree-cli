import Instruction from '../Instruction';
import Path from '../Path';
import Tree from '../Tree';
import CreateFile from './CreateFile';
import DeleteFile from './DeleteFile';

export default class CopyFile extends Instruction {
  from: Path;
  to: Path;

  constructor(from: Path, to: Path) {
    super();
    this.from = from;
    this.to = to;
  }

  execute(input: Tree): Tree {
    return new DeleteFile(this.to)
      .then(new CreateFile(this.to, this.from.getId(input) as string))
      .execute(input);
  }

  toString(): string {
    return `cp ${this.from} ${this.to}`;
  }
}
