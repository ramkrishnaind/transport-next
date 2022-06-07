import { Schema, model, models } from 'mongoose';

const customerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    lowercase: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationDate: {
    type: Date,
  },
  forgetPasswordToken: {
    type: String,
  },
  active: {
    type: Number,
    default: true,
  },
  lastLoginTime: {
    type: Date,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
},
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    id: false,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
  },
  {
    collection: "customer",
  });

const Customer = models.customer || model('customer', customerSchema);

export default Customer;

