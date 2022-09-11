import { array } from "joi";
import { Schema, model, models, mongoose } from "mongoose";

const bookingSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      default: null,
    },
    booking_id: {
      type: String,
      required: true,
      trim: true,
    },
    shiftingFor: {
      type: String,
      required: true,
      trim: true,
    },
    shiftingFrom: {
      type: String,
      required: false,
      trim: true,
    },
    shiftingTo: {
      type: String,
      required: false,
      trim: true,
    },
    shiftingOn: {
      type: Date,
      required: false,
    },
    currentFloor: {
      type: String,
    },
    isLiftAvailableOnCurrentFloor: {
      type: Boolean,
    },
    movingOnFloor: {
      type: String,
    },
    isLiftAvailableOnMovingFloor: {
      type: Boolean,
    },
    sofaSets: {
      type: Array,
    },
    table: {
      type: Array,
    },
    chair: {
      type: Array,
    },
    cots: {
      type: Array,
    },
    mattress: {
      type: Array,
    },
    cupboard: {
      type: Array,
    },
    tvs: {
      type: Array,
    },
    refrigerators: {
      type: Array,
    },
    washingMachines: {
      type: Array,
    },
    ovens: {
      type: Array,
    },
    airConditioners: {
      type: Array,
    },
    fansCooler: {
      type: Array,
    },
    bikes: {
      type: Array,
    },
    cars: {
      type: Array,
    },
    cycles: {
      type: Array,
    },
    step4: {
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
    collection: "booking",
  }
);

const Booking = models.booking || model("booking", bookingSchema);

export default Booking;
