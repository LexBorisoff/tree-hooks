import path from 'node:path';
import type { FileTreeInterface } from '@app/types/file-tree.types.js';

export interface PathTreeDir {
  type: 'dir';
  path: string;
}

export interface PathTreeFile {
  type: 'file';
  data: string;
  path: string;
}

export type PathTreeItem = PathTreeFile | PathTreeDir;

export function getPathArray(
  fileTree: FileTreeInterface,
  basePath: string,
): PathTreeItem[] {
  const result: PathTreeItem[] = [];

  function traverse(node: FileTreeInterface, parentPath: string): void {
    function getPath(key: string): string {
      return path.resolve(`${parentPath}/${key}`);
    }

    Object.entries(node).forEach(([key, value]) => {
      const currentPath = getPath(key);

      if (typeof value === 'string') {
        result.push({
          type: 'file',
          path: currentPath,
          data: value,
        });
        return;
      }

      result.push({
        type: 'dir',
        path: currentPath,
      });

      traverse(value, currentPath);
    });
  }

  traverse(fileTree, basePath);
  return result;
}
