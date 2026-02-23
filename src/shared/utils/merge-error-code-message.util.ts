import { ErrorCode } from '@shared/constants/error-code.constant';

/**
 * Merge error code and message into a single string.
 *
 * @param options - The options object.
 * @param options.message - The error message.
 * @param options.errorCode - The error code.
 * @returns The merged error code and message.
 */
export function mergeErrorCodeMessage({
  message,
  errorCode,
}: {
  message: string;
  errorCode: ErrorCode;
}): string {
  return `${errorCode} | ${message.trim()}`;
}
