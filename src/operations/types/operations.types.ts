import type { FileTree, AppDir } from '../../types/file-tree.types.js';

export interface FileOperations {
  read: () => string | null;
  write: (contents: string | (() => string)) => void;
  clear: () => void;
  exists: () => boolean;
}

export type OperationStructure<T extends FileTree<false>> = {
  [K in keyof T]: T[K] extends AppDir
    ? T[K]['children'] extends FileTree
      ? OperationStructure<T[K]['children']>
      : {}
    : FileOperations;
};
