import { Schema, model } from 'mongoose'
import User from './user.interface'

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model<User>('User', UserSchema)
