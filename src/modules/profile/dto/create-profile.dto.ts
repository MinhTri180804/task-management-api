import { IsHumanName } from '@shared/decorators/is-human-name.decorator';
import { NameLength } from '@shared/decorators/name-length.decorator';
import { IsOptional, IsUrl } from 'class-validator';

export class CreateProfileDTO {
  @IsHumanName()
  @NameLength(1, 20)
  firstName: string;

  @IsHumanName()
  @NameLength(1, 20)
  lastName: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
