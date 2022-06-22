import mongoose from 'mongoose'
import { UserSchema } from './Schemas/user'
import { booking_itemSchema } from './Schemas/booking_item'

export const UserDB=mongoose.model('user', UserSchema)