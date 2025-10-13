import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserProviderDocument = HydratedDocument<UserProviderEntity>;

@Schema({ _id: false })
export class UserProviderEntity {
  @Prop({ type: String, required: true })
  provider: string;
  @Prop({ type: String, required: true, index: true })
  providerId: string;

  @Prop({ type: String || null, required: false })
  providerEmail: string | null;
}

export const UserProviderSchema =
  SchemaFactory.createForClass(UserProviderEntity);
