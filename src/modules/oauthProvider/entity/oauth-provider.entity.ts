import { User } from '@modules/user/entity/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

const COLLECTION_NAME = 'oauth_providers';
const DEFAULT_PROVIDER_EMAIL = null;

export const OAUTH_PROVIDER_COLLECTION_NAME = COLLECTION_NAME;

export type OAuthProviderDocument = HydratedDocument<OAuthProvider>;

@Schema({ collection: COLLECTION_NAME, versionKey: false, timestamps: true })
export class OAuthProvider {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  user_id: User;

  @Prop({ type: String, required: true })
  provider: string;

  @Prop({ type: String, required: true, index: true })
  provider_id: string;

  @Prop({ type: String, required: false, default: DEFAULT_PROVIDER_EMAIL })
  provider_email?: string | null;
}

export const OAuthProviderSchema = SchemaFactory.createForClass(OAuthProvider);
