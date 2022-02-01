import { TreeInput } from './Tree';

export default function sortKeys(
  input: TreeInput | string,
): TreeInput | string {
  if (typeof input !== 'object') {
    return input;
  }

  const output: TreeInput = {};

  for (const key of Object.keys(input).sort()) {
    output[key] = sortKeys(input[key]);
  }

  return output;
}
