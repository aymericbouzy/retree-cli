import DeleteFile from './DeleteFile';

export default class DeleteDirectory extends DeleteFile {
  toString(): string {
    return `rm -rf ${this.path}`;
  }
}
