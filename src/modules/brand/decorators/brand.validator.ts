import { applyDecorators } from '@nestjs/common';
import { Trim } from '@shared/decorators/trim.decorator';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Validates that the brand name is a non-empty string with a length between 3 and 16 characters.
 * @returns {Function} The decorator function.
 */
export function IsBrandName() {
  return applyDecorators(
    IsString(),
    Trim(),
    MinLength(3, { message: 'Name camera must be at least 3 characters long' }),
    MaxLength(16, {
      message: 'Name camera must be at most 16 characters long',
    }),
  );
}

/**
 * Validates that the brand description is a non-empty string.
 * @returns {Function} The decorator function.
 */
export function IsBrandDescription() {
  return applyDecorators(IsString(), IsNotEmpty(), Trim());
}
