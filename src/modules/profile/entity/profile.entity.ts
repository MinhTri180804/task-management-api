import { User } from '@modules/user/entity/user.entity';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/core/base/entity/base.entity';
import { HydratedDocument, Types } from 'mongoose';

const AVATAR_DEFAULT_URL =
  'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg';
const COLLECTION_NAME = 'profiles';

export const PROFILE_COLLECTION_NAME = COLLECTION_NAME;

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ collection: COLLECTION_NAME, versionKey: false, timestamps: true })
export class Profile extends BaseEntity {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  user_id: User;

  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: false, default: AVATAR_DEFAULT_URL })
  avatar_url: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

export const ProfileModel: ModelDefinition = {
  name: Profile.name,
  schema: ProfileSchema,
  collection: COLLECTION_NAME,
};
