import type {
  GetDirOperationsFn,
  GetFileOperationsFn,
  OperationsType,
} from '../types/operation.types.js';

/**
 * Identity function that helps created a function
 * that returns custom file operations
 */
export function createFileOperations<
  K extends string,
  O extends OperationsType<K>,
  F extends GetFileOperationsFn<K, O>,
>(getOperations: F): F {
  return getOperations;
}

/**
 * Identity function that helps created a function
 * that returns custom dir operations
 */
export function createDirOperations<
  K extends string,
  O extends OperationsType<K>,
  F extends GetDirOperationsFn<K, O>,
>(getOperations: F): F {
  return getOperations;
}
