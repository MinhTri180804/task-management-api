import { AuthMethodEnum } from '@enum/auth-method.enum';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '@shared/entities/base/base.entity';
import { HydratedDocument } from 'mongoose';

const DEFAULT_EMAIL_IS_VERIFIED = false;
const DEFAULT_LOCAL_AUTH_ENABLED = false;
const COLLECTION_NAME = 'users';

export const USER_COLLECTION_NAME = COLLECTION_NAME;

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: COLLECTION_NAME, versionKey: false, timestamps: true })
export class User extends BaseEntity {
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
    type: Number,
    enum: AuthMethodEnum,
    required: true,
  })
  primary_auth_method: AuthMethodEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
  collection: COLLECTION_NAME,
};
