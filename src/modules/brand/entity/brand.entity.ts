import { User } from '@modules/user/entity/user.entity';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from 'src/core/base/entity/base.entity';

const COLLECTION_NAME = 'brands';
const VERSION_KEY = false;
const TIME_STAMPS = true;

export const BRAND_COLLECTION_NAME = COLLECTION_NAME;

export type BrandDocument = HydratedDocument<Brand>;

@Schema({
  collection: COLLECTION_NAME,
  versionKey: VERSION_KEY,
  timestamps: TIME_STAMPS,
})
export class Brand extends BaseEntity {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  description?: string | null;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  createdBy: Types.ObjectId;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
export const BrandModel: ModelDefinition = {
  name: Brand.name,
  schema: BrandSchema,
  collection: COLLECTION_NAME,
};
