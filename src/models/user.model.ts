import mongoose from 'mongoose';
import { roles } from '../config/roles';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate: {
        validator: (value: any) => !!value.match(/\d/) && !!value.match(/[a-zA-Z]/),
        message: 'Password must contain at least one letter and one number',
      },
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;