import Tree from './Tree';

export default class Instruction {
  execute(input: Tree): Tree {
    return input;
  }

  then(instruction: Instruction): Instruction {
    return new InstructionList([this, instruction]);
  }

  toString(): string {
    return '';
  }
}

export class InstructionList extends Instruction {
  list: Instruction[];

  constructor(list: Instruction[]) {
    super();
    this.list = list;
  }

  execute(input: Tree): Tree {
    return this.list.reduce(
      (input, instruction) => instruction.execute(input),
      input,
    );
  }

  then(instruction: Instruction): Instruction {
    return new InstructionList([...this.list, instruction]);
  }

  toString(): string {
    return this.list
      .map((instruction) => instruction.toString())
      .filter(Boolean)
      .join('; ');
  }
}
