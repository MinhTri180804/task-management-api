import { IsOptional } from 'class-validator';
import { IsBrandDescription, IsBrandName } from '../decorators/brand.validator';

export class CreateDTO {
  @IsBrandName()
  name: string;

  @IsBrandDescription()
  @IsOptional()
  description?: string;
}
