#!/usr/bin/env node

import readDirectory from './readDirectory';
import YAML from 'yaml';
import tmp from 'tmp-promise';
import fs from 'fs';
import child_process from 'child_process';
import diff from './diff';
import Tree from './Tree';
import sortKeys from './sortKeys';
import yargs from 'yargs/yargs';

const writeFile = (path: string, content: string): Promise<void> =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, content, 'utf-8', (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });

const readFile = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, content) => {
      if (error) {
        return reject(error);
      }
      return resolve(content);
    });
  });

const wellKnownIgnore = ['node_modules', '.git', '.next'];

async function run() {
  const { ignore = [], directory = '.' } = yargs(process.argv.slice(2))
    .command('* [directory]', 'Display tree in editable file', (yargs) => {
      yargs.positional('directory', {
        default: '.',
        type: 'string',
      });
    })
    .options({
      ignore: {
        type: 'array',
        default: [],
        description: 'folder names to ignore',
      },
    })
    .example('$0', 'Display tree in editable file')
    .example('$0 src', 'Display only the ./src directory')
    .example('$0 --ignore coverage', 'Ignore coverage directory').argv;

  const input = await readDirectory(directory as string, {
    ignore: [...wellKnownIgnore, ...ignore],
  });

  const { path } = await tmp.file({ postfix: '.yml' });
  await writeFile(path, YAML.stringify(sortKeys(input)));

  child_process.exec(`$EDITOR ${path}`, async (err, stdout, stderr) => {
    if (err || stderr) {
      throw err || stderr;
    }

    const output = YAML.parse(await readFile(path));

    const script = diff({
      input: new Tree(input),
      output: new Tree(output),
    }).toString();

    if (script) {
      child_process.exec(script, async (err, stdout, stderr) => {
        if (err || stderr) {
          throw err || stderr;
        }
      });
    }
  });
}

run().catch((error) => console.error(error));
