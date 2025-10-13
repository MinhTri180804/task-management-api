import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '@shared/entities/base/base.entity';
import { HydratedDocument } from 'mongoose';
import { UserProviderEntity } from './provider.entity';

const AVATAR_DEFAULT_URL =
  'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg';
const DEFAULT_EMAIL_IS_VERIFIED = false;
const DEFAULT_LOCAL_AUTH_ENABLED = false;
const COLLECTION_NAME = 'users';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ collection: COLLECTION_NAME, versionKey: false, timestamps: true })
export class UserEntity extends BaseEntity {
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
  })
  password: string;

  @Prop({
    type: String,
    required: false,
  })
  first_name: string;

  @Prop({
    type: String,
    required: false,
  })
  last_name: string;

  @Prop({
    type: String,
    required: true,
    default: AVATAR_DEFAULT_URL,
  })
  avatar_url: string;

  @Prop({
    type: Boolean,
    required: true,
    default: DEFAULT_EMAIL_IS_VERIFIED,
  })
  is_email_verified: boolean;

  @Prop({
    type: Boolean,
    required: true,
    default: DEFAULT_LOCAL_AUTH_ENABLED,
  })
  local_auth_enabled: boolean;

  @Prop({
    type: [UserProviderEntity],
    required: true,
    default: [],
  })
  auth_providers: UserProviderEntity[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
