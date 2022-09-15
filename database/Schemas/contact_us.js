import { array } from "joi";
import { Schema, model, models, mongoose } from "mongoose";

const contact_usSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    actionTaken: {
      type: String,
      required: true,
    },
    contactStatus: {
      type: Boolean,
      default: true,
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
    collection: "contact_us",
  }
);

const contact_us = models.contact_us || model("contact_us", contact_usSchema);

export default contact_us;
