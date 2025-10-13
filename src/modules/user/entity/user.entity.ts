import { SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '@shared/entities/base/base.entity';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

export class UserEntity extends BaseEntity {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  is_email_verified: boolean;
  local_auth_enabled: boolean;
  // TODO: Implement auth provider later in here
  auth_providers: [];
  created_at: Date;
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
