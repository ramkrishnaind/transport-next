import mongoose from 'mongoose'
import { UserSchema } from './Schemas/user'
import { booking_itemSchema } from './Schemas/booking_item'

export const UserDB=mongoose.model('user', UserSchema)
export const Booking_itemDB=mongoose.model('booking_item', booking_itemSchema)