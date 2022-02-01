import { v4 as uuid } from 'uuid';
import fs from 'fs';
import { TreeInput } from './Tree';

export interface DirectoryEntry {
  name: string;
  isFile: boolean;
}

export interface FileSystemReader {
  (path: string): Promise<Array<DirectoryEntry>>;
}

const nodeFileSystemReader = (path: string): Promise<DirectoryEntry[]> =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        return reject(error);
      }
      let remaining = files.length;
      const entries: DirectoryEntry[] = [];
      files.forEach((file) => {
        fs.stat(`${path}/${file}`, (error, entry) => {
          if (error) {
            return reject(error);
          }
          if (entry.isFile() || entry.isDirectory()) {
            entries.push({ name: file, isFile: entry.isFile() });
          }
          remaining--;
          if (!remaining) {
            resolve(entries);
          }
        });
      });
    });
  });

async function readDirectory(
  path: string,
  {
    fileSystemReader = nodeFileSystemReader,
    generateId = uuid,
    ignore = [],
  }: {
    fileSystemReader?: FileSystemReader;
    generateId?: () => string;
    ignore?: string[];
  } = {},
): Promise<TreeInput> {
  const result: TreeInput = {};
  for (const entry of await fileSystemReader(path)) {
    if (!ignore.find((name) => name === entry.name)) {
      result[entry.name] = entry.isFile
        ? generateId()
        : await readDirectory(`${path}/${entry.name}`, {
            fileSystemReader,
            generateId,
          });
    }
  }
  return result;
}

export default readDirectory;
