import { User } from '@modules/user/entity/user.entity';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class BaseEntity {
  readonly _id?: Types.ObjectId;

  @Prop({ default: null, required: false })
  deleted_at?: Date;

  @Prop({
    default: null,
    required: false,
    ref: () => User.name,
    type: Types.ObjectId,
  })
  deletedBy?: Types.ObjectId;

  createdAt?: string;
  updatedAt?: string;
}
