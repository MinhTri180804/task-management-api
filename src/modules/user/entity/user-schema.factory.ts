import { ModelDefinition } from '@nestjs/mongoose';
import { hashPassword } from '@util/password.util';
import {
  CallbackWithoutResultAndOptionalError,
  HydratedDocument,
} from 'mongoose';
import { User, UserSchema } from './user.entity';

async function hashPasswordMiddleware(
  this: HydratedDocument<User>,
  next: CallbackWithoutResultAndOptionalError,
) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  this.password = await hashPassword({ password: this.password });

  next();
}

export const UserSchemaFactory = (): ModelDefinition['schema'] => {
  const userSchema = UserSchema;

  // === Hook ===
  userSchema.pre('save', hashPasswordMiddleware);

  // === Index ===
  userSchema.index({ email: 1 }, { unique: true });

  // === Virtual ===
  userSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });

  return userSchema;
};
