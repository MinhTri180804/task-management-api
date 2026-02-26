import { IsOptional, IsString } from 'class-validator';
import { IsBrandDescription, IsBrandName } from '../decorators/brand.validator';

export class UpdateDTO {
  @IsBrandName()
  @IsOptional()
  name: string;

  @IsBrandDescription()
  @IsOptional()
  description: string;
}
