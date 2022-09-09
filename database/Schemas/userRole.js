import {  Schema, model, models } from "mongoose";

const userRoleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
      trim: true,
    },
    roleValue: {
      type: Number,
      required: true,
      trim: true,
    },
    permission: {
      type: Array,
      required: true,
      },
  },
  {
    timestamps: {
      createdAt: "roleCreationDate",
      updatedAt: "updated",
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
    collection: "userRole",
  }
);

const Role = models.userRole || model("userRole", userRoleSchema);

export default Role;
