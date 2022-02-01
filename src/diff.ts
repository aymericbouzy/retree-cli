import Instruction from './Instruction';
import CopyFile from './instructions/CopyFile';
import CreateDirectory from './instructions/CreateDirectory';
import CreateFile from './instructions/CreateFile';
import DeleteDirectory from './instructions/DeleteDirectory';
import DeleteFile from './instructions/DeleteFile';
import MoveFile from './instructions/MoveFile';
import Path from './Path';
import Tree from './Tree';

function nextInstruction({ input, output }: { input: Tree; output: Tree }) {
  for (const directory of output.directories()) {
    const subTree = input.getSubTree(directory);
    if (typeof subTree === 'string') {
      return new MoveFile(directory, Path.temp());
    }
    if (subTree === null) {
      return new CreateDirectory(directory);
    }
  }

  for (const path of output.paths()) {
    const id = path.getId(output) as string;
    if (id !== path.getId(input)) {
      const inputPath = input.getPathForId(id);
      if (path.getId(input)) {
        return new MoveFile(path, Path.temp());
      }
      if (inputPath) {
        return new CopyFile(inputPath, path);
      }
      return new CreateFile(path, id);
    }
  }

  for (const path of input.paths()) {
    if (!output.getSubTree(path)) {
      return new DeleteFile(path);
    }
  }

  for (const directory of input.directories()) {
    if (!output.getSubTree(directory)) {
      return new DeleteDirectory(directory);
    }
  }

  return null;
}

function diff({ input, output }: { input: Tree; output: Tree }): Instruction {
  const instruction = nextInstruction({ input, output });

  if (instruction) {
    const nextInput = instruction.execute(input);
    return instruction.then(diff({ input: nextInput, output }));
  }

  return new Instruction();
}

export default diff;
