/**
 * A constant object that represents the different types of error codes.
 * Each property represents a specific error code and its value is a string.
 */
export const ERROR_CODE = {
  /**
   * Represents an unknown error.
   */
  UNKNOWN: 'UNKNOWN',
  /**
   * Represents a too many request error.
   */
  TOO_MANY_REQUEST: 'TOO_MANY_REQUEST',

  /**
   * Represents a validation failed error.
   */
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  /**
   * Represents a duplicate key error.
   */
  DUPLICATE_KEY: 'DUPLICATE_KEY',
  /**
   * Represents a validation request failed error.
   */
  VALIDATION_REQUEST: 'VALIDATION_REQUEST',

  // ------ FILE ------
  /**
   * Represents a file error.
   */
  FILE_ERROR: 'FILE_ERROR',
  /**
   * Represents an image aspect ratio size invalid error.
   */
  IMAGE_ASPECT_RATIO_SIZE_INVALID: 'IMAGE_ASPECT_RATIO_SIZE_INVALID',
  /**
   * Represents an image aspect ratio invalid error.
   */
  IMAGE_ASPECT_RATIO_INVALID: 'IMAGE_ASPECT_RATIO_INVALID',
  /**
   * Represents an image height invalid error.
   */
  HIGHT_IMAGE_INVALID: 'HIGHT_IMAGE_INVALID',
  /**
   * Represents an image width invalid error.
   */
  WIDTH_IMAGE_INVALID: 'WIDTH_IMAGE_INVALID',
  /**
   * Represents a maximum size file invalid error.
   */
  MAX_SIZE_FILE_INVALID: 'MAX_SIZE_FILE_INVALID',
  /**
   * Represents a type file invalid error.
   */
  TYPE_FILE_INVALID: 'TYPE_FILE_INVALID',
  /**
   * Represents an image aspect ratio size min max invalid error.
   */
  IMAGE_ASPECT_RATIO_SIZE_MIN_MAX_INVALID:
    'IMAGE_ASPECT_RATIO_SIZE_MIN_MAX_INVALID',

  // ------ PROFILE ------
  /**
   * Represents a profile not exists error.
   */
  PROFILE_NOT_EXISTS: 'PROFILE_NOT_EXISTS',
  /**
   * Represents a profile not initialized error.
   */
  PROFILE_NOT_INITIALIZED: 'PROFILE_NOT_INITIALIZED',
  /**
   * Represents a profile exists error.
   */
  PROFILE_EXISTS: 'PROFILE_EXISTS',

  // ------ AUTH ------
  /**
   * Represents a token invalid error.
   */
  TOKEN_INVALID: 'TOKEN_INVALID',

  // ------ BRAND ------
  /**
   * Represents a brand not found error.
   */
  BRAND_NOT_FOUND: 'BRAND_NOT_FOUND',
} as const;

/**
 * Represents the type of error codes.
 */
export type ErrorCode = keyof typeof ERROR_CODE;
/**
 * Represents the values of error codes.
 */
export type ErrorCodeValues = (typeof ERROR_CODE)[ErrorCode];
