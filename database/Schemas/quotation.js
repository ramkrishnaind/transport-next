import { Schema, model, models, mongoose } from "mongoose";

const quotationSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      default: null,
    },
    customerfullName: {
      type: String,
    },
    customerMobileNo: {
      type: String,
    },
    customerEmailId: {
      type: String,
    },
    customerCarCharge: {
      type: String,
    },
    typeOTransport: {
      type: String,
    },
    totalTConveyance: {
      type: String,
    },
    estimatedDeliveryTime: {
      type: String,
    },
    packingMCost: {
      type: String,
    },
    loadingCharges: {
      type: String,
    },
    localTConveyance: {
      type: String,
    },
    localTConveyance_yes: {
      type: String,
    },
    unloadingCharges: {
      type: String,
    },
    otherCharges: {
      type: String,
    },
    otherCharges_yes: {
      type: String,
    },
    notes: {
      type: String,
    },
    totalCharges: {
      type: String,
    },
    margin: {
      type: String,
    },
    afterMarginTotalCharges: {
      type: String,
    },
    quotationUserId: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "quotationCreationDate",
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
    collection: "quotation",
  }
);

const Quotation = models.quotation || model("quotation", quotationSchema);

export default Quotation;
