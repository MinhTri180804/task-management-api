import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class BaseEntity {
  readonly _id?: Types.ObjectId;

  @Prop({ default: null, required: false })
  deleted_at?: Date;
}
