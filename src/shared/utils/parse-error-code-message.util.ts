import { ERROR_CODE, ErrorCode } from '@shared/constants/error-code.constant';

/**
 * Parses the error code message from a given string.
 *
 * @param message - The error message containing the error code. The error code is expected
 *                  to be separated from the message by a vertical bar '|'.
 * @returns An object containing the parsed message and error code. If the error code is not
 *          found in the message, it defaults to 'UNKNOWN'.
 */
export function parseErrorCodeMessage(message: string): {
  message: string;
  errorCode: string;
} {
  const separatorIndex = message.indexOf('|');

  if (separatorIndex === -1) {
    // If no separator is found, return the original message and default error code.
    return { message, errorCode: ERROR_CODE.UNKNOWN };
  }

  // Extract the error code and message from the message string.
  const errorCodeValue = message.slice(0, separatorIndex);
  const messageValue = message.slice(separatorIndex + 1);

  return { message: messageValue.trim(), errorCode: errorCodeValue };
}
