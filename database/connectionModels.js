import mongoose from 'mongoose'
import { UserSchema } from './Schemas/user'

export const UserDB=mongoose.model('user', UserSchema)
