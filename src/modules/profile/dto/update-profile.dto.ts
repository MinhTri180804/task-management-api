import { IsHumanName } from '@shared/decorators/is-human-name.decorator';
import { NameLength } from '@shared/decorators/name-length.decorator';
import { IsOptional, IsUrl } from 'class-validator';

export class UpdateUserProfileDTO {
  @IsHumanName()
  @NameLength(1, 30)
  @IsOptional()
  firstName?: string;

  @IsHumanName()
  @NameLength(1, 30)
  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
