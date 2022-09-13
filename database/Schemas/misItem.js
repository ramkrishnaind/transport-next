import { array } from "joi";
import { Schema, model, models, mongoose } from "mongoose";

const utilityItemSchema = new Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
      default: null,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
      default: null
    },
    cartonboxes: {
      type: Array,
    },
    wetgrinders: {
      type: Array,
    },
    frames: {
      type: Array,
    },
    swings: {
      type: Array,
    },
    waterdrums: {
      type: Array,
    },
    waterpurifiers: {
      type: Array,
    },
    cockerysets: {
      type: Array,
    },
    excercisecycles: {
      type: Array,
    },
    cribes: {
      type: Array,
    },
    vacumcleaners: {
      type: Array,
    },
    hometheatres: {
      type: Array,
    },
    treadmils: {
      type: Array,
    },
    lpgcylinders: {
      type: Array,
    },
    dishwashers: {
      type: Array,
    },
    showpieces: {
      type: Array,
    },
    infantcycles: {
      type: Array,
    },
    trunks: {
      type: Array,
    },
    desktops: {
      type: Array,
    },
    barcabinets: {
      type: Array,
    },
    flowerpotsmall: {
      type: Array,
    },
    batteries: {
      type: Array,
    },
    swingmachines: {
      type: Array,
    },
    lamps: {
      type: Array,
    },
    flowerpotlarge: {
      type: Array,
    },
    kitchenracks: {
      type: Array,
    },
    stoves: {
      type: Array,
    },
    temples: {
      type: Array,
    },
    beanbags: {
      type: Array,
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
    collection: "utilityItem",
  }
);

const UtilityItem = models.utilityItem || model("utilityItem", utilityItemSchema);

export default UtilityItem;